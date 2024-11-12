import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function StakingPage() {
  useEffect(() => {
    document.title = "Staking";
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Staking Page</Typography>
    </Box>
  );
}
