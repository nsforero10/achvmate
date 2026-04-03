"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";

interface DashboardHeaderProps {
  dateString: string;
  onOpenNew: () => void;
}

export function DashboardHeader({ dateString, onOpenNew }: DashboardHeaderProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        m: 2,
        py: 1,
        px: 2,
        bgcolor: isDark ? "#1a1a1a" : "#fafafa",
        borderRadius: 4,
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: "-0.02em" }}>
          Habit track
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
          {dateString}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onOpenNew}
          sx={{
            borderRadius: 8,
            borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
            color: isDark ? "#fff" : "#111",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { borderColor: isDark ? "#fff" : "#111", bgcolor: "transparent" },
          }}
        >
          New Habit
        </Button>
        <Avatar
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nico"
          sx={{ width: 48, height: 48, bgcolor: "#eee" }}
        />
      </Box>
    </Box>
  );
}
