"use client";

import { useState, useEffect, useRef } from "react";
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
import Chip from "@mui/material/Chip";
import ReactMarkdown from "react-markdown";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import CodeIcon from "@mui/icons-material/Code";
import LinkIcon from "@mui/icons-material/Link";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { HABIT_CATEGORIES } from "@/lib/categories";
import { useTheme, lighten, darken } from "@mui/material/styles";

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
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [formData, setFormData] = useState<HabitFormData>({
    name: "",
    categoryId: "wellness",
    startTime: "00:00",
    endTime: "00:00",
    frequency: [],
    description: "",
  });

  const descriptionRef = useRef<HTMLInputElement>(null);

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const input = descriptionRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) return;

    const text = formData.description;
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);

    setFormData((prev) => ({ ...prev, description: newText }));

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

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
          borderRadius: 3,
          padding: 2,
          minWidth: 400,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <DialogTitle sx={{ p: 0, fontWeight: 800 }}>
          {initialData ? "Edit Habit" : "New Habit"}
        </DialogTitle>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
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
              renderValue={(selected) => {
                const cat = HABIT_CATEGORIES.find((c) => c.id === selected) || HABIT_CATEGORIES[0];
                const Icon = cat.icon;
                return (
                  <Chip
                    icon={<Icon fontSize="small" />}
                    label={cat.label}
                    size="small"
                    sx={{
                      bgcolor: isDark ? darken(cat.color, 0.7) : lighten(cat.color, 0.6),
                      fontWeight: 600,
                      color: isDark ? lighten(cat.color, 0.4) : darken(cat.color, 0.6),
                      "& .MuiChip-icon": { color: isDark ? lighten(cat.color, 0.4) : darken(cat.color, 0.6) },
                    }}
                  />
                );
              }}
              sx={{ bgcolor: "rgba(0,0,0,0.04)" }}
            >
              {HABIT_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <MenuItem key={cat.id} value={cat.id}>
                    <Chip
                      icon={<Icon fontSize="small" />}
                      label={cat.label}
                      size="small"
                      sx={{
                        bgcolor: isDark ? darken(cat.color, 0.7) : lighten(cat.color, 0.6),
                        fontWeight: 600,
                        color: isDark ? lighten(cat.color, 0.4) : darken(cat.color, 0.6),
                        cursor: "pointer",
                        "& .MuiChip-icon": { color: isDark ? lighten(cat.color, 0.4) : darken(cat.color, 0.6) },
                      }}
                    />
                  </MenuItem>
                );
              })}
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
                      border: isActive ? "none" : "1px solid",
                      borderColor: isActive ? "transparent" : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"),
                      color: isActive ? "background.paper" : "text.primary",
                      bgcolor: isActive ? "text.primary" : "transparent",
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">Description</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton size="small" onClick={() => insertMarkdown("**", "**")} sx={{ bgcolor: "rgba(0,0,0,0.04)" }}><FormatBoldIcon fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => insertMarkdown("*", "*")} sx={{ bgcolor: "rgba(0,0,0,0.04)" }}><FormatItalicIcon fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => insertMarkdown("`", "`")} sx={{ bgcolor: "rgba(0,0,0,0.04)" }}><CodeIcon fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => insertMarkdown("[", "](url)")} sx={{ bgcolor: "rgba(0,0,0,0.04)" }}><LinkIcon fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => insertMarkdown("- ")} sx={{ bgcolor: "rgba(0,0,0,0.04)" }}><FormatListBulletedIcon fontSize="small" /></IconButton>
              </Box>
            </Box>
            <TextField
              inputRef={descriptionRef}
              fullWidth
              multiline
              rows={4}
              placeholder="Enter description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ "& .MuiOutlinedInput-root": { bgcolor: "rgba(0,0,0,0.04)", borderRadius: 3 } }}
            />
            {formData.description && (
              <Box sx={{ mt: 2, p: 2, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 3, border: "1px dashed rgba(0,0,0,0.1)" }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, opacity: 0.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Preview
                </Typography>
                <Box sx={{ 
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  "& p": { m: 0, mb: 1 },
                  "& p:last-child": { mb: 0 },
                  "& ul": { m: 0, pl: 2.5, mb: 1, listStyleType: "disc" },
                  "& ol": { m: 0, pl: 2.5, mb: 1, listStyleType: "decimal" },
                  "& li": { mb: 0.5 },
                  "& h1, & h2, & h3": { m: 0, mb: 1, fontWeight: 800, lineHeight: 1.2 },
                  "& h1": { fontSize: "1.4em" },
                  "& h2": { fontSize: "1.2em" },
                  "& h3": { fontSize: "1.1em" },
                  "& strong": { fontWeight: 800 },
                  "& code": { bgcolor: "rgba(0,0,0,0.05)", px: 0.5, py: 0.2, borderRadius: 1, fontFamily: "monospace" }
                }}>
                  <ReactMarkdown>{formData.description}</ReactMarkdown>
                </Box>
              </Box>
            )}
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
