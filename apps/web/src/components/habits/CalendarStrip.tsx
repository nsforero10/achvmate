import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

interface CalendarStripProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function CalendarStrip({ selectedDate, onSelectDate }: CalendarStripProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const today = new Date();
  
  const weekDates = DAYS_SHORT.map((_, ix) => {
    const d = new Date();
    const currentDay = d.getDay();
    d.setDate(d.getDate() - currentDay + ix + (weekOffset * 7));
    return d;
  });

  const todayStr = today.toISOString().split('T')[0];

  const handleNavigate = (direction: number) => {
    const newOffset = weekOffset + direction;
    setWeekOffset(newOffset);
    
    const d = new Date();
    const currentDay = d.getDay();
    if (newOffset === 0) {
      onSelectDate(d.toISOString().split('T')[0]);
    } else {
      d.setDate(d.getDate() - currentDay + 6 + (newOffset * 7));
      onSelectDate(d.toISOString().split('T')[0]);
    }
  };

  const formatMonthDay = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  
  let weekLabel = "";
  if (weekOffset === 0) {
    weekLabel = "This Week";
  } else if (weekOffset === -1) {
    weekLabel = "Last Week";
  } else {
    weekLabel = `${formatMonthDay(weekDates[0])} — ${formatMonthDay(weekDates[6])}`;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 6, gap: 2 }}>
      <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: "0.1em" }}>
        {weekLabel}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: { xs: 2, sm: 3 } }}>
        <IconButton 
          onClick={() => handleNavigate(-1)}
          sx={{ bgcolor: "background.paper", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", "&:hover": { bgcolor: "background.default" } }}
          size="small"
        >
          <ChevronLeftIcon />
        </IconButton>

        {weekDates.map((dateObj, ix) => {
          const dateStr = dateObj.toISOString().split('T')[0];
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;
          const isFuture = dateObj > today && dateStr !== todayStr;
          
          return (
             <Box
              key={dateStr}
              onClick={() => !isFuture && onSelectDate(dateStr)}
              sx={{
                minWidth: isSelected ? 84 : 44,
                height: 44,
                px: isSelected ? 2.5 : 0,
                borderRadius: isSelected ? 22 : "50%",
                border: isSelected ? "none" : "1px solid",
                borderColor: isSelected ? "transparent" : "rgba(150,150,150,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: isSelected 
                  ? "text.primary" 
                  : "background.paper",
                color: isSelected 
                  ? "background.paper"
                  : (isFuture ? "text.disabled" : "text.secondary"),
                cursor: isFuture ? "default" : "pointer",
                boxShadow: isSelected 
                  ? "0 8px 16px rgba(0,0,0,0.15)"
                  : "0 2px 8px rgba(0,0,0,0.05)",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: !isFuture && !isSelected ? "translateY(-2px)" : "none",
                  bgcolor: !isFuture && !isSelected ? "background.default" : undefined
                }
              }}
            >
              <Typography sx={{ fontWeight: isSelected ? 800 : 600, fontSize: isSelected ? 15 : 16 }}>
                {isSelected ? (isToday ? "Today" : dateStr.slice(5)) : DAYS_SHORT[ix]}
              </Typography>
            </Box>
          );
        })}

        <IconButton 
          onClick={() => handleNavigate(1)}
          disabled={weekOffset >= 0}
          sx={{ 
            bgcolor: "background.paper", 
            boxShadow: weekOffset >= 0 ? "none" : "0 2px 8px rgba(0,0,0,0.05)", 
            "&:hover": { bgcolor: "background.default" }
          }}
          size="small"
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
