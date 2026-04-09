"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";

interface DashboardHeaderProps {
  title?: string;
  dateString?: string;
  greeting?: string;
  onOpenNew?: () => void;
}

export function DashboardHeader({ title, dateString, greeting, onOpenNew }: DashboardHeaderProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mx: 2,
          mt: 2,
          mb: 4,
          py: 2,
          px: 3,
          bgcolor: "background.paper",
          borderRadius: 4,
          border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: "-0.02em" }}>
            {title || "Habit track"}
          </Typography>
          {dateString && (
            <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
              {dateString}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {onOpenNew && (
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
          )}
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nico"
            sx={{ width: 48, height: 48, bgcolor: "#eee" }}
          />
        </Box>
      </Box>

      {greeting && (
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            fontWeight: 800, 
            letterSpacing: "-0.02em", 
            mb: 4,
            color: "text.primary" 
          }}
        >
          {greeting}
        </Typography>
      )}
    </>
  );
}
