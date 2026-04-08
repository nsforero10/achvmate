"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { HistoryCalendarView } from "./HistoryCalendarView";
import { HistoryGalleryView } from "./HistoryGalleryView";

export function HistoryDashboard({ habits }: { habits: any[] }) {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ px: 4, pt: 4, pb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          History Analytics
        </Typography>
        
        <Tabs 
          value={tabIndex} 
          onChange={(e, v) => setTabIndex(v)}
          sx={{
            minHeight: 36,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              minHeight: 36,
              mr: 2,
            }
          }}
        >
          <Tab label="Contribution Map" disableRipple />
          <Tab label="Habit Tracks" disableRipple />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 4, pt: 2 }}>
        {tabIndex === 0 && <HistoryCalendarView habits={habits} />}
        {tabIndex === 1 && <HistoryGalleryView habits={habits} />}
      </Box>
    </Box>
  );
}
