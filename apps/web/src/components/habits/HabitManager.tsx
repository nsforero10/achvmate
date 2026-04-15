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
import { PageLayout } from "../layout/PageLayout";
import { useGetHabitsQuery, useCreateHabitMutation, useUpdateHabitMutation, useDeleteHabitMutation, useToggleHabitCompleteMutation } from "../../store/api";

interface HabitManagerProps {
  dateString: string;
}

export function HabitManager({ dateString }: HabitManagerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<any>(null);
  const [habitToDelete, setHabitToDelete] = useState<string | null>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // RTK Query Hooks
  const { data: habits = [], isLoading } = useGetHabitsQuery();
  const [createHabit] = useCreateHabitMutation();
  const [updateHabit] = useUpdateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();
  const [toggleHabit] = useToggleHabitCompleteMutation();

  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const handleOpenNew = () => {
    setEditingHabit(null);
    setModalOpen(true);
  };

  const handleSubmitHabit = async (data: HabitFormData) => {
    if (editingHabit) {
      await updateHabit({ id: editingHabit.id, data }).unwrap();
    } else {
      await createHabit(data).unwrap();
    }
    setModalOpen(false);
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
    await deleteHabit(habitToDelete).unwrap();
    setHabitToDelete(null);
  };

  const handleToggleComplete = async (habitId: string, customDate?: string) => {
    // Determine the date to toggle (either selected past date or today's standard completion)
    const toggleTarget = typeof customDate === 'string' ? customDate : todayStr;
    await toggleHabit({ habitId, date: toggleTarget }).unwrap();
  };

  return (
    <>
      <PageLayout
        header={<DashboardHeader title="Habit track" dateString={dateString} greeting="Welcome back, check your habits" onOpenNew={handleOpenNew} />}
        middleComponent={<CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />}
      >
        <Box sx={{ display: "flex", gap: 3, flexWrap: "nowrap", flexGrow: 1 }}>
          {isLoading && <Typography sx={{ p: 2 }}>Loading habits...</Typography>}
          {!isLoading && habits.map((h: any) => {
            const isCompletedOnSelected = h.entries?.some((e: any) => e.date.startsWith(selectedDate) && e.completed);

            return (
              <HabitCard
                key={h.id}
                habit={h}
                completed={isCompletedOnSelected}
                onToggleComplete={(id) => handleToggleComplete(id, selectedDate)}
                onEdit={handleEdit}
                onDelete={promptDelete}
              />
            );
          })}
        </Box>
      </PageLayout>

      {/* istanbul ignore next */}
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
