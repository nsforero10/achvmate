"use client";

import { useState } from "react";
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
import Typography from "@mui/material/Typography";

export function Sidebar() {
  const { toggle } = useColorMode();
  const theme = useTheme();
  const pathname = usePathname();
  const isDark = theme.palette.mode === "dark";
  const [expanded, setExpanded] = useState(false);

  const NavItemContent = ({ icon, label, active }: { icon: any, label: string, active?: boolean }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        p: 1.5,
        borderRadius: 3,
        cursor: "pointer",
        bgcolor: active ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)") : "transparent",
        color: active ? (isDark ? "#fff" : "#111") : (isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"),
        transition: "bgcolor 0.2s, color 0.2s",
        "&:hover": {
          bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
        }
      }}
    >
      <Box sx={{ minWidth: 24, display: "flex", justifyContent: "center", mr: expanded ? 2 : 0, transition: "margin 0.2s" }}>
        {icon}
      </Box>
      <Box sx={{ overflow: "hidden", display: "flex", flexGrow: 1 }}>
        <Typography 
          sx={{ 
            fontWeight: 600, 
            whiteSpace: "nowrap", 
            opacity: expanded ? 1 : 0, 
            transition: "opacity 0.2s",
            transform: expanded ? "translateX(0)" : "translateX(-10px)"
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      sx={{
        width: expanded ? 240 : 80,
        transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        bgcolor: isDark ? "#1e1e1e" : "#fff",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        py: 3,
        px: 1.5,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        mr: 2,
        overflow: "hidden",
        flexShrink: 0
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: expanded ? "flex-start" : "center",
          px: expanded ? 1.5 : 0,
          mb: 6,
          minHeight: 42,
          transition: "justify-content 0.2s, padding 0.2s"
        }}
      >
        <Logo size={42} variant={isDark ? "light" : "dark"} />
        <Typography 
          variant="h6" 
          sx={{ 
            ml: 2, 
            fontWeight: 800, 
            opacity: expanded ? 1 : 0, 
            transition: "opacity 0.2s",
            whiteSpace: "nowrap",
            display: expanded ? "block" : "none"
          }}
        >
          AchvMate
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>
        <Link href="/habits/daily" passHref legacyBehavior>
          <a style={{ textDecoration: 'none' }}>
            <NavItemContent 
              icon={<FormatListBulletedRoundedIcon />} 
              label="Daily Habits" 
              active={pathname?.includes("/habits/daily")} 
            />
          </a>
        </Link>
        
        <Link href="/habits/history-analytics" passHref legacyBehavior>
          <a style={{ textDecoration: 'none' }}>
            <NavItemContent 
              icon={<QueryStatsRoundedIcon />} 
              label="Analytics" 
              active={pathname?.includes("/habits/history-analytics")} 
            />
          </a>
        </Link>

        <NavItemContent icon={<CalendarTodayRoundedIcon />} label="Schedule" />
        <NavItemContent icon={<PersonRoundedIcon />} label="Profile" />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <NavItemContent icon={<SettingsOutlinedIcon />} label="Settings" />
        <Box onClick={toggle} sx={{ textDecoration: 'none' }}>
          <NavItemContent 
            icon={isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />} 
            label={isDark ? "Light Mode" : "Dark Mode"} 
          />
        </Box>
      </Box>
    </Box>
  );
}
