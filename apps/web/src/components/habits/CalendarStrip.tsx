import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

export function CalendarStrip() {
  // In a real app, this might calculate based on the current date
  // For now, we'll keep the static "Today" logic at index 4 like the original
  const todayIndex = 2;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 6 }}>
      {DAYS_SHORT.map((day, ix) => (
        <Box
          key={ix}
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: ix === todayIndex ? "2px solid" : "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: ix === todayIndex ? "action.hover" : "transparent",
          }}
        >
          <Typography sx={{ fontWeight: ix === todayIndex ? 800 : 400, fontSize: 16 }}>
            {ix === todayIndex ? "Today" : day}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
