import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function WinnersPage() {
  useEffect(() => {
    document.title = "Winners";
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Winners Page</Typography>
    </Box>
  );
}
