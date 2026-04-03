"use client";

import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { HABIT_CATEGORIES } from "@/lib/categories";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const DAY_CODES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export interface HabitFormData {
  name: string;
  categoryId: string;
  startTime: string;
  endTime: string;
  frequency: string[];
  description: string;
}

interface HabitFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: HabitFormData) => void;
  initialData?: HabitFormData | null;
}

export function HabitFormModal({ open, onClose, onSubmit, initialData }: HabitFormModalProps) {
  const [formData, setFormData] = useState<HabitFormData>({
    name: "",
    categoryId: "wellness",
    startTime: "00:00",
    endTime: "00:00",
    frequency: [],
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        categoryId: "wellness",
        startTime: "",
        endTime: "",
        frequency: [],
        description: "",
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleDay = (code: string) => {
    setFormData((prev) => ({
      ...prev,
      frequency: prev.frequency.includes(code)
        ? prev.frequency.filter((c) => c !== code)
        : [...prev.frequency, code],
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 2,
          minWidth: 400,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <DialogTitle sx={{ p: 0, fontWeight: 800 }}>
          {initialData ? "Edit Habit" : "New Habit"}
        </DialogTitle>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            fullWidth
            required
            size="small"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(0,0,0,0.04)" } }}
          />

          <FormControl fullWidth size="small">
            <Select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              displayEmpty
              sx={{ bgcolor: "rgba(0,0,0,0.04)" }}
            >
              {HABIT_CATEGORIES.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ width: 40 }}>Time</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
              <Typography variant="body2">Start:</Typography>
              <TextField
                type="time"
                size="small"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                sx={{ flexGrow: 1, bgcolor: "rgba(0,0,0,0.04)", borderRadius: 8 }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
              <Typography variant="body2">End:</Typography>
              <TextField
                type="time"
                size="small"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                sx={{ flexGrow: 1, bgcolor: "rgba(0,0,0,0.04)", borderRadius: 8 }}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>Days</Typography>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}>
              {DAYS.map((day, i) => {
                const code = DAY_CODES[i];
                const isActive = formData.frequency.includes(code);
                return (
                  <Box
                    key={i}
                    onClick={() => toggleDay(code)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid",
                      borderColor: isActive ? "black" : "rgba(0,0,0,0.2)",
                      color: isActive ? "white" : "black",
                      bgcolor: isActive ? "black" : "transparent",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 14,
                      transition: "all 0.2s",
                    }}
                  >
                    {day}
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>Description</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Enter description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(0,0,0,0.04)", borderRadius: 3 } }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: 8,
              py: 1.5,
              textTransform: "none",
              fontSize: 16,
              fontWeight: 600,
              mt: 2,
              "&:hover": { bgcolor: "#333" },
            }}
          >
            {initialData ? "Save changes" : "Create"}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
