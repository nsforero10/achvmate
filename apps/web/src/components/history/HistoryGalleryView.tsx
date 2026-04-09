"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useTheme, alpha, lighten, darken } from "@mui/material/styles";
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
                bgcolor: isDark ? darken(config.color, 0.7) : lighten(config.color, 0.6),
                color: isDark ? lighten(config.color, 0.4) : darken(config.color, 0.6),
                border: `1px solid ${isDark ? darken(config.color, 0.5) : lighten(config.color, 0.2)}`,
                borderRadius: 3,
                p: 2,
                cursor: "pointer",
                transition: "transform 0.2s, bgcolor 0.2s",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "translateY(-4px)",
                  bgcolor: isDark ? alpha(config.color, 0.15) : alpha(config.color, 0.2),
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
