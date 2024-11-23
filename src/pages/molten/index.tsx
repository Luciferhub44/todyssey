import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  styled,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import postmanMergeImage from "../../assets/images/postmanmerge1.png";

// Styled Components
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 16px',
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #14121b 0%, #000000 100%)',
});

const ContentWrapper = styled(Box)({
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
});

// Hero Section Component
const HeroSection = () => {
  return (
    <Box 
      display="flex" 
      alignItems="center"
      justifyContent="center"
      width="100%"
      mb={8}
      gap={8}
      sx={{
        flexDirection: { xs: 'column', md: 'row' }
      }}
    >
      {/* Left Content */}
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center"
        maxWidth={535}
        py={6}
      >
        <Box display="flex" justifyContent="center" py={2.5} width="100%">
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Montserrat', Helvetica",
              fontWeight: "500",
              color: "#ebebeb",
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: { xs: "2.4rem", md: "3.6rem" },
              textAlign: "center"
            }}
          >
            The journey of 4480 of Molten
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: "'Montserrat', Helvetica",
            fontWeight: "normal",
            color: "rgba(235, 235, 235, 0.7)",
            fontSize: { xs: "1rem", md: "1.25rem" },
            lineHeight: 1.5,
            textAlign: "center",
            mb: 2
          }}
        >
          A prophecy whispered in the corridors of ancient libraries of molten
          spoke of an enigmatic phenomenon referred to as "The Unveiling Expanse."
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Montserrat', Helvetica",
            fontWeight: "normal",
            color: "rgba(235, 235, 235, 0.7)",
            fontSize: { xs: "1rem", md: "1.25rem" },
            lineHeight: 1.5,
            textAlign: "center",
            mb: 2
          }}
        >
          It was foretold that when unity among the tribes is at its zenith.
          "Odyssey" will awaken the dormant ethereal plains, revealing secrets
          potent enough to either elevate tribes to divinity or plummet the realms
          into abyssal chaos.
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Montserrat', Helvetica",
            fontWeight: "normal",
            color: "rgba(235, 235, 235, 0.7)",
            fontSize: "1rem",
            lineHeight: 1.5,
            textAlign: "center",
            mb: 4
          }}
        >
          Whispers Of Lores.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ebebeb",
            color: "#0b081c",
            borderRadius: "60px",
            px: 6,
            py: 3,
            textTransform: "none",
            fontFamily: "'Inter', Helvetica",
            fontWeight: "normal",
            fontSize: "1rem",
            '&:hover': {
              backgroundColor: "#ffffff",
            }
          }}
        >
          Enter Odyssey
        </Button>
      </Box>

      {/* Right Image */}
      <Box
        sx={{
          width: { xs: '100%', md: 467 },
          height: 592,
          position: "relative",
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Box
          component="img"
          src={postmanMergeImage}
          alt="Postman merge"
          sx={{
            width: '100%',
            height: '100%',
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            borderRadius: '16px',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)',
          }}
        />
      </Box>
    </Box>
  );
};

const MoltenPage = () => {
  useEffect(() => {
    document.title = "Molten | Tribe Odyssey";
  }, []);

  const moltenFeatures = [
    {
      title: "Molten Forge",
      description: "Transform your Tribe NFTs into powerful new forms through our revolutionary molten process.",
      icon: "🔥"
    },
    {
      title: "Fusion Power",
      description: "Combine multiple Tribe NFTs to create rare and unique evolutionary variants.",
      icon: "⚡"
    },
    {
      title: "Rewards",
      description: "Earn exclusive rewards and special traits through the molten transformation process.",
      icon: "🎁"
    },
    {
      title: "Community Power",
      description: "Join forces with other Tribe members to unlock special community molten events.",
      icon: "👥"
    }
  ];

  return (
    <StyledContainer maxWidth={false}>
      <ContentWrapper>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Grid */}
        <Grid container spacing={4}>
          {moltenFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  backgroundColor: "#181818",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Typography fontSize="2rem">{feature.icon}</Typography>
                    <StarIcon sx={{ color: '#ff0008' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ffffff',
                      fontFamily: 'Montserrat, Helvetica',
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontFamily: 'Montserrat, Helvetica',
                      mb: 3
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ContentWrapper>
    </StyledContainer>
  );
};

export default MoltenPage; 