import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { Twitter, Telegram, Instagram } from "@mui/icons-material";
import { Discord } from "../icons/Discord";
import { Link } from "react-router-dom";
import { footerLinks } from "../../types/nav";
import { styled } from "@mui/material/styles";

const StyledDivider = styled(Divider)({
  margin: "40px 0",
  borderColor: "rgba(255, 255, 255, 0.16)",
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.16) 50%, rgba(255,255,255,0))",
});

const SocialIcon = styled("a")({
  color: "white",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
});

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#14121b',
        color: 'white',
        py: 6,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Navigation Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Montserrat' }}>
              Navigation
            </Typography>
            <Stack spacing={2}>
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        color: '#ff0008',
                      },
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {link.name}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Montserrat' }}>
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <SocialIcon href="https://twitter.com" target="_blank">
                <Twitter />
              </SocialIcon>
              <SocialIcon href="https://telegram.org" target="_blank">
                <Telegram />
              </SocialIcon>
              <SocialIcon href="https://discord.com" target="_blank">
                <Discord />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank">
                <Instagram />
              </SocialIcon>
            </Stack>
          </Grid>
        </Grid>

        <StyledDivider />

        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
            fontFamily: 'Montserrat',
          }}
        >
          © {new Date().getFullYear()} Tribe Odyssey. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
