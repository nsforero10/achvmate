"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";

import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
  const config = getCategoryConfig(habit.categoryId);
  const Icon = config.icon;

  const timeString = `${habit.startTime || "--:--"} - ${habit.endTime || "--:--"}`;

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      elevation={0}
      sx={{
        width: 250,
        minHeight: 340,
        bgcolor: config.color,
        color: "#1a1a1a",
        borderRadius: 4,
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
          <Icon fontSize="small" sx={{ opacity: 0.8 }} />
          <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.8 }}>
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
          <IconButton size="small" disableRipple sx={{ color: "inherit", opacity: 0.8, p: 0.5 }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 1, letterSpacing: "-0.02em" }}>
        {habit.name}
      </Typography>

      {isHovered ? (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5, mt: 1, animation: "fadeIn 0.2s" }}>
          <Box>
            <Typography variant="caption" sx={{ display: "block", mb: 0.5, opacity: 0.8 }}>Time:</Typography>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, border: "1px solid rgba(0,0,0,0.4)", borderRadius: 12, px: 1, py: 0.25 }}>
              <AccessTimeIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{timeString}</Typography>
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
                    border: "1px solid rgba(0,0,0,0.4)",
                    bgcolor: isActive ? "rgba(0,0,0,0.05)" : "transparent",
                    color: "inherit",
                    fontWeight: isActive ? 800 : 400,
                  }}
                >
                  <Typography variant="caption" sx={{ fontSize: 10 }}>{day}</Typography>
                </Box>
              );
            })}
          </Box>

          {habit.description && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ display: "block", mb: 0.2, opacity: 0.8 }}>Description</Typography>
              <Typography variant="caption" sx={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.3 }}>
                {habit.description}
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }} />
      )}

      {!isHovered && (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: "auto" }}>
          <Typography variant="caption" sx={{ fontWeight: 600, opacity: 0.8 }}>
            {timeString}
          </Typography>
          <Box
            onClick={() => onToggleComplete?.(habit.id, completed)}
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              border: "2px solid rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              bgcolor: completed ? "rgba(0,0,0,0.8)" : "transparent",
            }}
          >
            {completed && <Typography sx={{ color: config.color, lineHeight: 1 }}>✓</Typography>}
          </Box>
        </Box>
      )}

      {isHovered && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "auto" }}>
        </Box>
      )}
    </Card>
  );
}
