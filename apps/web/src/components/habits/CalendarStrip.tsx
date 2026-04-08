import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

export function CalendarStrip() {
  // In a real app, this might calculate based on the current date
  // For now, we'll keep the static "Today" logic at index 4 like the original
  const todayIndex = 2;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 6 }}>
      {DAYS_SHORT.map((day, ix) => {
        const isToday = ix === todayIndex;
        return (
          <Box
            key={ix}
            sx={{
              minWidth: isToday ? 84 : 44,
              height: 44,
              px: isToday ? 2.5 : 0,
              borderRadius: isToday ? 22 : "50%",
              border: isToday ? "2px solid" : "1px solid",
              borderColor: isToday ? "text.primary" : "rgba(150,150,150,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "transparent",
              color: isToday ? "text.primary" : "text.secondary",
            }}
          >
            <Typography sx={{ fontWeight: isToday ? 800 : 500, fontSize: 16 }}>
              {isToday ? "Today" : day}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
