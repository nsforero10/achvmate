"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export interface PageLayoutProps {
  header: React.ReactNode;
  middleComponent?: React.ReactNode;
  children: React.ReactNode;
}

export function PageLayout({ header, middleComponent, children }: PageLayoutProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      {header}
      {middleComponent}
      
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          m: 2,
          mt: 0,
          borderRadius: 3,
          border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
          boxShadow: isDark ? "none" : "0 10px 40px rgba(0,0,0,0.05)",
          p: 4,
          overflowX: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </>
  );
}
