"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";

export function HistoryCalendarView({ habits }: { habits: any[] }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Generate the last 364 days (52 weeks exactly for a nice grid)
  const days = useMemo(() => {
    const list = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize
    
    // Start from 363 days ago to have exactly 364 days (52x7)
    for (let i = 363; i >= 0; i--) {
      const d = new Date(today.getTime());
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      // Calculate how many habits were completed on this day
      let completions = 0;
      let total = habits.length;
      
      habits.forEach(h => {
         const entry = h.entries?.find((e: any) => e.date.startsWith(dateStr) && e.completed);
         if (entry) completions++;
      });

      list.push({
        date: dateStr,
        displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        completions,
        total,
        intensity: completions === 0 ? 0 : (completions / Math.max(total, 1))
      });
    }
    return list;
  }, [habits]);

  const getColor = (intensity: number) => {
    if (intensity === 0) return isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
    if (intensity < 0.3) return isDark ? "#1e5c3a" : "#9be9a8";
    if (intensity < 0.6) return isDark ? "#298f4c" : "#40c463";
    if (intensity < 0.9) return isDark ? "#3db462" : "#30a14e";
    return isDark ? "#4fdb79" : "#216e39";
  };

  const getCompletedHabitsForDate = (dateStr: string) => {
    return habits.filter(h => h.entries?.some((e: any) => e.date.startsWith(dateStr) && e.completed));
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto", pb: 2 }}>
      <Box sx={{ minWidth: 800 }}>
        <Box 
          sx={{ 
            display: "grid", 
            gridAutoFlow: "column", 
            gridTemplateRows: "repeat(7, 12px)", 
            gap: "4px",
            height: "fit-content"
          }}
        >
          {days.map((d, i) => (
            <Tooltip key={i} title={`${d.completions} habits on ${d.displayDate}`} arrow placement="top">
              <Box
                component="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedDate(d.date);
                }}
                sx={{
                  cursor: "pointer",
                  width: 12,
                  height: 12,
                  p: 0,
                  m: 0,
                  border: "none",
                  outline: "none",
                  bgcolor: getColor(d.intensity),
                  borderRadius: "2px",
                  transition: "transform 0.1s",
                  "&:hover": { transform: "scale(1.2)" }
                }}
              />
            </Tooltip>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, px: 1, opacity: 0.5 }}>
          <Typography variant="caption">1 Year Ago</Typography>
          <Typography variant="caption">Today</Typography>
        </Box>
      </Box>

      {/* Daily Summary Modal */}
      <Dialog 
        open={!!selectedDate} 
        onClose={() => setSelectedDate(null)}
        PaperProps={{ sx: { borderRadius: 3, p: 2, minWidth: 320 } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>{days.find(d => d.date === selectedDate)?.displayDate}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.7 }}>
            Completed Habits:
          </Typography>
          {selectedDate && getCompletedHabitsForDate(selectedDate).length === 0 && (
            <Typography variant="body2" sx={{ fontStyle: "italic", opacity: 0.5 }}>None</Typography>
          )}
          {selectedDate && getCompletedHabitsForDate(selectedDate).map((h, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography sx={{ color: "success.main", fontWeight: 800 }}>✓</Typography>
              <Typography>{h.name}</Typography>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
