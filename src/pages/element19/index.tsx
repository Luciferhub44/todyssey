import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid as MuiGrid,
  Card,
  CardContent,
  CardMedia,
  Button,
  styled,
  Chip,
  type GridProps,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { CollectionItem as ICollectionItem, Element19Collections } from "../../types";

// Create a typed Grid component
const Grid = MuiGrid as React.ComponentType<GridProps>;

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

const GradientTitle = styled(Typography)({
  background: "linear-gradient(180deg, rgb(235, 235, 235) 0%, rgba(235, 235, 235, 0) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textFillColor: "transparent",
  fontFamily: "'Montserrat', Helvetica",
  fontWeight: 500,
  fontSize: "80px",
  textAlign: "center",
  letterSpacing: "-2.4px",
  lineHeight: "80px",
  marginBottom: '40px',
  '@media (max-width: 600px)': {
    fontSize: '48px',
    lineHeight: '48px',
  }
});

const StyledCard = styled(Card)({
  backgroundColor: "#181818",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 8,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    border: "1px solid rgba(255, 255, 255, 0.2)",
  }
});

interface CollectionItemProps extends ICollectionItem {
  // Any additional props specific to the component
}

const CollectionItem = ({ image, title, description, price, releaseDate, status }: CollectionItemProps) => (
  <StyledCard>
    <CardMedia
      component="img"
      height="300"
      image={image}
      alt={title}
      sx={{ objectFit: 'cover' }}
    />
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#ffffff',
            fontFamily: 'Montserrat, Helvetica',
            fontWeight: 600,
            mb: 1
          }}
        >
          {title}
        </Typography>
        <Chip
          label={status}
          sx={{
            bgcolor: status === 'Available' ? '#4CAF50' : 
                    status === 'Coming Soon' ? '#2196F3' : '#757575',
            color: 'white',
            fontFamily: 'Inter, Helvetica',
          }}
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: 'Montserrat, Helvetica',
          mb: 2,
          minHeight: '60px'
        }}
      >
        {description}
      </Typography>

      {releaseDate && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CalendarTodayIcon sx={{ color: '#ff0008', fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'Inter, Helvetica',
            }}
          >
            Release Date: {releaseDate}
          </Typography>
        </Box>
      )}

      {price && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <StarIcon sx={{ color: '#ff0008', fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'Inter, Helvetica',
            }}
          >
            Price: {price} ETH
          </Typography>
        </Box>
      )}

      <Button
        fullWidth
        variant="contained"
        disabled={status !== 'Available'}
        sx={{
          backgroundColor: "#ebebeb",
          color: "#0b081c",
          borderRadius: "60px",
          py: 1.5,
          textTransform: "none",
          fontFamily: "'Inter', Helvetica",
          fontWeight: "normal",
          fontSize: "1rem",
          '&:hover': {
            backgroundColor: "#ffffff",
          },
          '&.Mui-disabled': {
            backgroundColor: "rgba(235, 235, 235, 0.12)",
            color: "rgba(255, 255, 255, 0.3)",
          }
        }}
      >
        {status === 'Available' ? 'Collect Now' : 
         status === 'Coming Soon' ? 'Coming Soon' : 'Sold Out'}
      </Button>
    </CardContent>
  </StyledCard>
);

const Element19Page = () => {
  useEffect(() => {
    document.title = "Element19 Collections";
  }, []);

  const collections: Element19Collections = {
    comics: [
      {
        image: "/images/comic1.jpeg",
        title: "The Exodus: Chapter 1",
        description: "Follow the journey of the first tribes as they discover the ancient prophecies.",
        price: "0.1",
        status: 'Available',
      },
      {
        image: "/images/comic1.jpeg",
        title: "The Exodus: Chapter 2",
        description: "The saga continues as the tribes face their greatest challenges yet.",
        releaseDate: "March 2024",
        status: 'Coming Soon',
      },
    ],
    posters: [
      {
        image: "/images/comic1.jpeg",
        title: "Tribal Warriors",
        description: "Limited edition poster featuring the legendary Tribal Warriors.",
        price: "0.05",
        status: 'Available',
      },
      {
        image: "/images/comic1.jpeg",
        title: "The Prophecy",
        description: "Exclusive artwork depicting the ancient prophecy of the tribes.",
        status: 'Sold Out',
      },
    ],
    upcoming: [
      {
        image: "/images/comic1.jpeg",
        title: "Mystery Collection",
        description: "A mysterious new collection that will change everything.",
        releaseDate: "April 2024",
        status: 'Coming Soon',
      },
    ],
  };

  return (
    <StyledContainer maxWidth={false}>
      <ContentWrapper>
        <GradientTitle variant="h1">
          Element19 Collections
        </GradientTitle>

        {/* Comics Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              color: '#ffffff',
              fontFamily: 'Montserrat, Helvetica',
              fontWeight: 500,
              mb: 4,
              textAlign: 'center'
            }}
          >
            Comics
          </Typography>
          <Grid container spacing={4} component="div">
            {collections.comics.map((item: ICollectionItem, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index} component="div">
                <CollectionItem {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Posters Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              color: '#ffffff',
              fontFamily: 'Montserrat, Helvetica',
              fontWeight: 500,
              mb: 4,
              textAlign: 'center'
            }}
          >
            Posters
          </Typography>
          <Grid container spacing={4}>
            {collections.posters.map((item: ICollectionItem, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CollectionItem {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Upcoming Drops Section */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: '#ffffff',
              fontFamily: 'Montserrat, Helvetica',
              fontWeight: 500,
              mb: 4,
              textAlign: 'center'
            }}
          >
            Upcoming Drops
          </Typography>
          <Grid container spacing={4}>
            {collections.upcoming.map((item: ICollectionItem, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CollectionItem {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </ContentWrapper>
    </StyledContainer>
  );
};

export default Element19Page; 