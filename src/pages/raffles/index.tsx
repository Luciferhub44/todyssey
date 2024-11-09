import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function RafflesPage(): JSX.Element {
  useEffect(() => {
    document.title = "Raffles";
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Raffles Page</Typography>
    </Box>
  );
}
