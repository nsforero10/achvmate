"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { HistoryCalendarView } from "./HistoryCalendarView";
import { HistoryGalleryView } from "./HistoryGalleryView";
import { PageLayout } from "../layout/PageLayout";
import { DashboardHeader } from "../habits/DashboardHeader";
import { HabitFormModal, HabitFormData } from "../HabitFormModal";
import { useGetHabitsQuery, useCreateHabitMutation } from "../../store/api";

export function HistoryDashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { data: habits = [], isLoading } = useGetHabitsQuery();
  const [createHabit] = useCreateHabitMutation();

  const handleCreateSubmit = async (data: HabitFormData) => {
    await createHabit(data).unwrap();
    setModalOpen(false);
  };

  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const tabs = (
    <Box sx={{ px: 4, pb: 1 }}>
      <Tabs 
        value={tabIndex} 
        onChange={(e, v) => setTabIndex(v)}
        sx={{
          minHeight: 36,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            minHeight: 36,
            mr: 2,
            color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)",
            transition: "color 0.2s",
            "&.Mui-selected": {
              color: isDark ? "#fff" : "#111",
            }
          },
          "& .MuiTabs-indicator": {
            backgroundColor: isDark ? "#fff" : "#111"
          }
        }}
      >
        <Tab label="Contribution Map" disableRipple />
        <Tab label="Habit Tracks" disableRipple />
      </Tabs>
    </Box>
  );

  return (
    <>
      <PageLayout
        header={<DashboardHeader title="History Analytics" dateString={dateString} onOpenNew={() => setModalOpen(true)} actionLabel="New Habit" />}
        middleComponent={tabs}
      >
        <Box sx={{ p: 2 }}>
          {isLoading && <Typography sx={{ p: 2 }}>Loading analytics...</Typography>}
          {!isLoading && tabIndex === 0 && <HistoryCalendarView habits={habits} />}
          {!isLoading && tabIndex === 1 && <HistoryGalleryView habits={habits} />}
        </Box>
      </PageLayout>

      <HabitFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />
    </>
  );
}
