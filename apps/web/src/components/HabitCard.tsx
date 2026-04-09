"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { alpha, lighten, darken, useTheme } from "@mui/material/styles";

import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReactMarkdown from "react-markdown";

import { getCategoryConfig } from "@/lib/categories";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const DAY_CODES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

interface HabitProps {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  frequency: string[];
  startTime: string | null;
  endTime: string | null;
}

interface HabitCardProps {
  habit: HabitProps;
  completed?: boolean;
  onToggleComplete?: (id: string, currentStatus: boolean) => void;
  onEdit?: (habit: HabitProps) => void;
  onDelete?: (id: string) => void;
}

export function HabitCard({
  habit,
  completed = false,
  onToggleComplete,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const config = getCategoryConfig(habit.categoryId);
  const Icon = config.icon;

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return { time: "--:--", period: "" };
    const [h, m] = timeStr.split(":");
    let hours = parseInt(h, 10);
    const period = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    return { time: `${hours}:${m}`, period };
  };

  const start = formatTime(habit.startTime);
  const end = formatTime(habit.endTime);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      elevation={0}
      sx={{
        minWidth: 250,
        minHeight: 340,
        bgcolor: isDark ? darken(config.color, 0.7) : lighten(config.color, 0.6),
        color: isDark ? lighten(config.color, 0.4) : darken(config.color, 0.6),
        border: `1px solid ${isDark ? darken(config.color, 0.5) : lighten(config.color, 0.2)}`,
        borderRadius: 3,
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {!isHovered ? null : <Icon fontSize="small" sx={{ opacity: 0.8 }} />}
          <Typography variant="caption" sx={{ fontWeight: isHovered ? 600 : 300, opacity: 0.9, fontSize: isHovered ? 12 : 16 }}>
            {config.label}
          </Typography>
        </Box>

        {isHovered ? (
          <Box sx={{ display: "flex", gap: 0 }}>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit?.(habit)} sx={{ color: "inherit", p: 0.5 }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={() => onDelete?.(habit.id)} sx={{ color: "inherit", p: 0.5 }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Icon fontSize="medium" sx={{ color: "#1a1a1a", opacity: 0.9 }} />
        )}
      </Box>

      {isHovered ? (
        <>
          <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 1, letterSpacing: "-0.02em" }}>
            {habit.name}
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5, mt: 1, animation: "fadeIn 0.2s" }}>
            <Box>
              <Typography variant="caption" sx={{ display: "block", mb: 0.5, opacity: 0.8 }}>Time:</Typography>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, border: "1px solid rgba(0,0,0,0.4)", borderRadius: 12, px: 1, py: 0.25 }}>
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>{`${start.time}${start.period} - ${end.time}${end.period}`}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
              {DAYS.map((day, i) => {
                const isActive = habit.frequency.includes(DAY_CODES[i]);
                return (
                  <Box
                    key={i}
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid currentColor",
                      bgcolor: isActive ? "currentColor" : "transparent",
                      color: "inherit",
                      fontWeight: isActive ? 800 : 400,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontSize: 10, color: isActive ? "background.paper" : "inherit" }}>{day}</Typography>
                  </Box>
                );
              })}
            </Box>

            {habit.description && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" sx={{ display: "block", mb: 0.2, opacity: 0.8 }}>Description</Typography>
                <Box sx={{ 
                  overflowY: "auto", 
                  maxHeight: 120,
                  lineHeight: 1.3,
                  fontSize: "0.75rem",
                  "& p": { m: 0, mb: 0.5 },
                  "& p:last-child": { mb: 0 },
                  "& ul": { m: 0, pl: 2.5, mb: 0.5, listStyleType: "disc" },
                  "& ol": { m: 0, pl: 2.5, mb: 0.5, listStyleType: "decimal" },
                  "& li": { mb: 0.2 },
                  "& h1, & h2, & h3": { m: 0, mb: 0.5, fontWeight: 800, lineHeight: 1.2 },
                  "& h1": { fontSize: "1.2em" },
                  "& h2": { fontSize: "1.1em" },
                  "& h3": { fontSize: "1.05em" },
                  "& strong": { fontWeight: 800 },
                  "& code": { bgcolor: "rgba(0,0,0,0.05)", px: 0.5, borderRadius: 1, fontFamily: "monospace" }
                }}>
                  <ReactMarkdown>{habit.description}</ReactMarkdown>
                </Box>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography 
            variant="h4" 
            align="center"
            sx={{ fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em", color: "inherit" }}
          >
            {habit.name}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: "auto", pt: 1 }}>
        {isHovered ? (
          <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.8 }}>
            {`${start.time}${start.period} - ${end.time}${end.period}`}
          </Typography>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 300, lineHeight: 1 }}>{start.time}</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 300, lineHeight: 1.2, opacity: 0.8 }}>{start.period}</Typography>
            </Box>
            <Typography sx={{ fontSize: 15, fontWeight: 800, mb: 1.5 }}>_</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography sx={{ fontSize: 15, fontWeight: 300, lineHeight: 1 }}>{end.time}</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 300, lineHeight: 1.2, opacity: 0.8 }}>{end.period}</Typography>
            </Box>
          </Box>
        )}

        <Box
          onClick={() => onToggleComplete?.(habit.id, completed)}
          sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            border: "1.5px solid currentColor",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            bgcolor: completed ? "currentColor" : "transparent",
            mb: 0.5
          }}
        >
          {completed && <Typography sx={{ color: isDark ? "background.paper" : "background.paper", lineHeight: 1 }}>✓</Typography>}
        </Box>
      </Box>
    </Card>
  );
}
