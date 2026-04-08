"use client";

import { useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getCategoryConfig } from "@/lib/categories";

export function HabitGraphModal({ habit, onClose }: { habit: any, onClose: () => void }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const config = getCategoryConfig(habit.categoryId);

  // Parse last 30 days rolling data
  const data = useMemo(() => {
    const list: { date: string, completion: number }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today.getTime());
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const isCompleted = habit.entries?.some((e: any) => e.date.startsWith(dateStr) && e.completed) ? 100 : 0;
      
      list.push({
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        completion: isCompleted,
      });
    }

    // Apply a simple 3-day moving average to smooth the line
    const smoothedList = list.map((item, idx) => {
      let sum = 0;
      let count = 0;
      for (let j = Math.max(0, idx - 2); j <= idx; j++) {
        sum += list[j].completion;
        count++;
      }
      return {
        ...item,
        trend: Math.round(sum / count)
      };
    });

    return smoothedList;
  }, [habit]);

  return (
    <Dialog 
      open={!!habit} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ 
        sx: { 
          borderRadius: 4, 
          p: 2,
          bgcolor: "background.paper",
        } 
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>{habit.name}</Typography>
          <Typography variant="caption" sx={{ color: config.color, fontWeight: 600 }}>{config.label} Trend</Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 4, pt: 2, height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontSize: 12 }} 
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? "#1e1e1e" : "#fff", 
                borderRadius: 8, 
                border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)" 
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="trend" 
              stroke={config.color} 
              strokeWidth={4} 
              dot={false}
              activeDot={{ r: 8, strokeWidth: 0, fill: config.color }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </DialogContent>
    </Dialog>
  );
}
