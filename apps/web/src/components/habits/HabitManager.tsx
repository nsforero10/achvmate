"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { HabitCard } from "../HabitCard";
import { HabitFormModal, HabitFormData } from "../HabitFormModal";
import { DashboardHeader } from "./DashboardHeader";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CalendarStrip } from "./CalendarStrip";

interface HabitManagerProps {
  initialHabits: any[];
  dateString: string;
}

export function HabitManager({ initialHabits, dateString }: HabitManagerProps) {
  const [habits, setHabits] = useState(initialHabits);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<any>(null);
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

  const handleDelete = async (id: string) => {
    await fetch(`${API_BASE}/habits/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchHabits();
  };

  return (
    <>
      <DashboardHeader dateString={dateString} onOpenNew={handleOpenNew} />
      <Typography variant="h4" align="center" fontWeight="300" sx={{ mt: 2, mb: 4, opacity: 0.8 }}>
            Track your habits
        </Typography>
        <CalendarStrip />
      
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: isDark ? "#1e1e1e" : "#fff",
          m: 4,
          mt: 0,
          borderRadius: 6,
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          p: 4,
          overflowX: "auto",
          display: "flex",
          gap: 3,
        }}
      >
        {habits.map((h) => (
          <HabitCard
            key={h.id}
            habit={h}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Box>

      <HabitFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitHabit}
        initialData={editingHabit}
      />
    </>
  );
}
