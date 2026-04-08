"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../../app/providers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import { Logo } from "../Logo";

export function Sidebar() {
  const { toggle } = useColorMode();
  const theme = useTheme();
  const pathname = usePathname();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        width: 80,
        bgcolor: isDark ? "#1e1e1e" : "#fff",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        mr: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 6,
        }}
      >
        <Logo size={42} variant={isDark ? "light" : "dark"} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, flexGrow: 1 }}>
        <Link href="/habits/daily" passHref legacyBehavior>
          <IconButton 
            sx={{ 
              color: pathname?.includes("/habits/daily") ? (isDark ? "#fff" : "#111") : (isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"), 
              bgcolor: pathname?.includes("/habits/daily") ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)") : "transparent" 
            }}
          >
            <FormatListBulletedRoundedIcon />
          </IconButton>
        </Link>
        
        <Link href="/habits/history-analytics" passHref legacyBehavior>
          <IconButton 
            sx={{ 
              color: pathname?.includes("/habits/history-analytics") ? (isDark ? "#fff" : "#111") : (isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"),
              bgcolor: pathname?.includes("/habits/history-analytics") ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)") : "transparent"
            }}
          >
            <QueryStatsRoundedIcon />
          </IconButton>
        </Link>

        <IconButton sx={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
          <CalendarTodayRoundedIcon />
        </IconButton>
        <IconButton sx={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
          <PersonRoundedIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <IconButton sx={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }} onClick={toggle}>
          {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </IconButton>
      </Box>
    </Box>
  );
}
