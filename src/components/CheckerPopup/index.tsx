import React from "react";
import { Box, Grid, IconButton, Typography, Modal, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImageIcon from "@mui/icons-material/Image";

interface CheckerPopupProps {
  open: boolean;
  onClose: () => void;
  data: {
    assetsValue: string;
    favoriteSpecies: string;
    totalAssets: number;
    progress: number;
  };
}

export const CheckerPopup: React.FC<CheckerPopupProps> = ({ open, onClose, data }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "relative",
            width: { xs: '90%', md: 909 },
            height: { xs: 'auto', md: 800 },
            backgroundColor: "#181818",
            outline: 'none',
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: '90%', md: 735 },
              height: { xs: 'auto', md: 625 },
              alignItems: "center",
              justifyContent: "center",
              gap: 2.5,
              padding: { xs: 3, md: 6.25 },
              position: { xs: 'relative', md: "absolute" },
              top: { md: 88 },
              left: { md: 83 },
              mx: { xs: 'auto' },
              my: { xs: 4 },
              backgroundColor: "#181818",
              borderRadius: 1,
              border: "1px solid #ffffff1a",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2.5,
                width: "100%",
              }}
            >
              {/* Title Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.25,
                  width: "100%",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: 40, md: 80 },
                    textAlign: "center",
                    background: "linear-gradient(180deg, #EBEBEB 0%, rgba(235, 235, 235, 0) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textFillColor: "transparent",
                    fontFamily: "Montserrat, Helvetica",
                    fontWeight: 500,
                    lineHeight: { xs: "40px", md: "80px" },
                    letterSpacing: "-0.15em",
                  }}
                >
                  Road to&nbsp;&nbsp;T19
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Montserrat, Helvetica",
                    fontWeight: 600,
                    color: "#ebebeb",
                    textAlign: "center",
                  }}
                >
                  {data.progress}/19
                </Typography>

                {/* Progress Bar */}
                <Box sx={{ width: '100%', position: 'relative', height: 120 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: 2,
                      top: 58,
                      backgroundColor: '#363636',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      width: `${(data.progress / 19) * 100}%`,
                      height: 2,
                      top: 58,
                      background: 'linear-gradient(180deg, #FF0008 0%, #FF0008 33.33%, #FF0008 66.67%, #191A1A 100%)',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: 4,
                        top: -2,
                        filter: 'blur(4px)',
                        background: 'linear-gradient(180deg, rgba(255, 0, 8, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
                      }
                    }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Montserrat, Helvetica",
                    fontWeight: 600,
                    color: "#ebebeb",
                    textAlign: "center",
                  }}
                >
                  COLLECT THIS SPECIES
                </Typography>
              </Box>

              {/* Species Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 146,
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ArrowDownwardIcon sx={{ color: "#ebebeb", fontSize: 32 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Montserrat, Helvetica",
                      fontWeight: 500,
                      color: "#ebebeb",
                      whiteSpace: "nowrap",
                    }}
                  >
                    24 CARAT
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ImageIcon sx={{ color: "#ebebeb", fontSize: 32 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Montserrat, Helvetica",
                      fontWeight: 500,
                      color: "#ebebeb",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ACID
                  </Typography>
                </Box>
              </Box>

              {/* Stats Section */}
              <Grid 
                container 
                spacing={3}
                sx={{ mt: 2 }}
              >
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.7,
                        fontFamily: "Inter, Helvetica",
                        fontWeight: 700,
                        color: "#ebebeb",
                        fontSize: 13,
                      }}
                    >
                      Assets value
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Inter, Helvetica",
                        fontWeight: 700,
                        color: "#ebebeb",
                        fontSize: 22,
                      }}
                    >
                      {data.assetsValue}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.7,
                        fontFamily: "Inter, Helvetica",
                        fontWeight: 700,
                        color: "#ebebeb",
                        fontSize: 13,
                      }}
                    >
                      Favourite species
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Inter, Helvetica",
                        fontWeight: 700,
                        color: "#ebebeb",
                        fontSize: 22,
                      }}
                    >
                      {data.favoriteSpecies}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.7,
                        fontFamily: "Inter, Helvetica",
                        fontWeight: 700,
                        color: "#ebebeb",
                        fontSize: 13,
                      }}
                    >
                      Total assets
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Inter, Helvetica",
                        fontWeight: 700,
                        color: "#ebebeb",
                        fontSize: 22,
                      }}
                    >
                      {data.totalAssets}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: { xs: 8, md: 8 },
              right: { xs: 8, md: 42 },
              width: 40,
              height: 40,
              borderRadius: "20px",
              border: "1px solid #ff0008",
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 8, 0.1)',
              }
            }}
          >
            <CloseIcon sx={{ color: "#ff0008", fontSize: 24 }} />
          </IconButton>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CheckerPopup; 