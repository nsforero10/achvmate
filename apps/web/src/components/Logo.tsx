"use client";

import React from "react";
import Box from "@mui/material/Box";

interface LogoProps {
  size?: number;
  variant?: "dark" | "light";
}

export function Logo({ size = 46, variant = "dark" }: LogoProps) {
  const isLight = variant === "light";
  const primaryColor = isLight ? "#FFFFFF" : "#000000";
  const secondaryColor = isLight ? "#000000" : "#FFFFFF";

  return (
    <Box
      component="svg"
      width={size}
      height={size}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ display: "block" }}
    >
      <rect width="46" height="46" rx="16" fill={primaryColor} />
      <path
        d="M38 11V30.875V38H33L30 31H27L23 38L19 31H16L13 38H8V30.875V11L16.5 21.5L23 8L29.5 21.5L38 11Z"
        fill={secondaryColor}
      />
      <path d="M31 25L35.5 18.5V33.5L31 25Z" fill={primaryColor} />
      <path d="M10.5 33.5V18.5L15 25L10.5 33.5Z" fill={primaryColor} />
      <path d="M19.5 23L23 15L26.5 23L23 31L19.5 23Z" fill={primaryColor} />
    </Box>
  );
}
