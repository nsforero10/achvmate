import Box from "@mui/material/Box";
import { Sidebar } from "../../components/layout/Sidebar";

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        height: "100vh", 
        bgcolor: "transparent", 
        p: 2, 
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
