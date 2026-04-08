"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { HabitCard } from "../HabitCard";
import { HabitFormModal, HabitFormData } from "../HabitFormModal";
import { DashboardHeader } from "./DashboardHeader";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CalendarStrip } from "./CalendarStrip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface HabitManagerProps {
  initialHabits: any[];
  dateString: string;
}

export function HabitManager({ initialHabits, dateString }: HabitManagerProps) {
  const [habits, setHabits] = useState(initialHabits);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<any>(null);
  const [habitToDelete, setHabitToDelete] = useState<string | null>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const fetchHabits = async () => {
    try {
      const res = await fetch(`${API_BASE}/habits`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setHabits(data);
      }
    } catch (e) {
      console.error("Fetch habits error:", e);
    }
  };

  const handleOpenNew = () => {
    setEditingHabit(null);
    setModalOpen(true);
  };

  const handleSubmitHabit = async (data: HabitFormData) => {
    if (editingHabit) {
      await fetch(`${API_BASE}/habits/${editingHabit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
    } else {
      await fetch(`${API_BASE}/habits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
    }
    setModalOpen(false);
    fetchHabits();
  };

  const handleEdit = (habit: any) => {
    setEditingHabit(habit);
    setModalOpen(true);
  };

  const promptDelete = (id: string) => {
    setHabitToDelete(id);
  };

  const confirmDelete = async () => {
    if (!habitToDelete) return;
    await fetch(`${API_BASE}/habits/${habitToDelete}`, {
      method: "DELETE",
      credentials: "include",
    });
    setHabitToDelete(null);
    fetchHabits();
  };

  const handleToggleComplete = async (habitId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    await fetch(`${API_BASE}/habits/${habitId}/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ date: todayStr }),
    });
    fetchHabits();
  };

  return (
    <>
      <DashboardHeader dateString={dateString} onOpenNew={handleOpenNew} />
        <CalendarStrip />
      
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          m: 2,
          mt: 0,
          borderRadius: 4,
          border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
          boxShadow: isDark ? "none" : "0 10px 40px rgba(0,0,0,0.05)",
          p: 4,
          overflowX: "auto",
          display: "flex",
          gap: 3,
        }}
      >
        {habits.map((h) => {
          const todayStr = new Date().toISOString().split('T')[0];
          const isCompletedToday = h.entries?.some((e: any) => e.date.startsWith(todayStr) && e.completed);

          return (
            <HabitCard
              key={h.id}
              habit={h}
              completed={isCompletedToday}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEdit}
              onDelete={promptDelete}
            />
          );
        })}
      </Box>

      <HabitFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitHabit}
        initialData={editingHabit}
      />

      <Dialog 
        open={!!habitToDelete} 
        onClose={() => setHabitToDelete(null)} 
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Delete Habit?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this habit? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setHabitToDelete(null)} 
            sx={{ color: "text.primary", textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            variant="contained" 
            color="error" 
            disableElevation
            sx={{ textTransform: "none", fontWeight: 600, borderRadius: 8, px: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
