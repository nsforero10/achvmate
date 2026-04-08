"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { getCategoryConfig } from "@/lib/categories";
import { HabitGraphModal } from "./HabitGraphModal";

export function HistoryGalleryView({ habits }: { habits: any[] }) {
  const [selectedHabit, setSelectedHabit] = useState<any>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {habits.map((habit) => {
          const config = getCategoryConfig(habit.categoryId);
          const Icon = config.icon;
          const completions = habit.entries?.filter((e: any) => e.completed) || [];

          return (
            <Card
              key={habit.id}
              onClick={() => setSelectedHabit(habit)}
              elevation={0}
              sx={{
                width: 200,
                minHeight: 120,
                bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                borderRadius: 4,
                p: 2,
                cursor: "pointer",
                transition: "transform 0.2s, bgcolor 0.2s",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "translateY(-4px)",
                  bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                }
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Icon fontSize="small" sx={{ color: config.color }} />
                <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.8 }}>
                  {config.label}
                </Typography>
              </Box>
              
              <Typography sx={{ fontWeight: 800, lineHeight: 1.2, mb: "auto" }}>
                {habit.name}
              </Typography>

              <Typography variant="caption" sx={{ mt: 2, opacity: 0.6, fontWeight: 600 }}>
                {completions.length} total completions
              </Typography>
            </Card>
          );
        })}
      </Box>

      {selectedHabit && (
        <HabitGraphModal 
          habit={selectedHabit} 
          onClose={() => setSelectedHabit(null)} 
        />
      )}
    </>
  );
}
