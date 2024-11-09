import { Box, Stack, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Twitter, Telegram, Instagram } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { GradientText } from "./StyledComponents";
import { Discord } from "../icons/Discord";

// Types
interface NavLink {
  name: string;
  path: string;
  external?: boolean;
}

interface NavItem {
  text: string;
  links: NavLink[];
}

export const NAV_ITEMS: NavItem[] = [
  { 
    text: "Assets", 
    links: [
      { name: '4K Tribe', path: '/4ktribe' },
      { name: 'Wallpapers', path: '/wallpaper' },
      { name: 'ENS', path: '/ens' },
      { name: 'Tribal Beats', path: '/beats' }
    ]
  },
  { 
    text: "Marketplace", 
    links: [
      { name: 'Marketplace', path: '/marketplace' },
      { name: 'Opensea', path: 'https://opensea.io/tribe', external: true },
      { name: 'Looksrare', path: 'https://looksrare.org/tribe', external: true },
      { name: 'X2Y2', path: 'https://x2y2.io/tribe', external: true }
    ]
  },
  { 
    text: "Staking", 
    links: [
      { name: 'Stake Apes', path: '/staking' },
      { name: 'Raffles', path: '/raffles' },
      { name: 'Winners', path: '/winners' }
    ]
  },
  { 
    text: "The Council", 
    links: [
      { name: 'Council', path: '/council' }
    ]
  }
];

// Add type safety for social links
interface SocialLink {
  url: string;
  icon: React.ComponentType;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { url: 'https://twitter.com/tribeodyssey', icon: Twitter, label: 'Twitter' },
  { url: 'https://t.me/tribeodyssey', icon: Telegram, label: 'Telegram' },
  { url: 'https://instagram.com/tribeodyssey', icon: Instagram, label: 'Instagram' },
  // ... other social links
];

// Styled components
const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  height: 80,
  position: 'relative',
  zIndex: 1100,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 4),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 6),
  },
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: 60,
  height: 24,
  cursor: 'pointer',
  [theme.breakpoints.up('sm')]: {
    width: 72.8,
    height: 28,
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  padding: '8px',
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: 'white',
    transform: 'translateY(-2px)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '24px',
  },
}));

const SocialStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginRight: theme.spacing(2),
}));

const DiscordButton = styled(Box)(({ theme }) => ({
  padding: '10px 24px',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    
    '&::before': {
      opacity: 1,
    },
  },
}));

export const Header = (): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [navMenuAnchors, setNavMenuAnchors] = useState<(HTMLElement | null)[]>(
    new Array(NAV_ITEMS.length).fill(null)
  );

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const newAnchors = [...navMenuAnchors];
    newAnchors[index] = event.currentTarget;
    setNavMenuAnchors(newAnchors);
  };

  const handleNavMenuClose = (index: number) => {
    const newAnchors = [...navMenuAnchors];
    newAnchors[index] = null;
    setNavMenuAnchors(newAnchors);
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <HeaderWrapper>
      <LogoImage
        src={logo}
        alt="TRIBE Logo"
        onClick={() => navigate('/')}
      />

      {isMobile ? (
        <>
          <IconButton
            onClick={handleMobileMenuOpen}
            sx={{
              ml: 'auto',
              mr: 2,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <MobileMenu
            mobileMenuAnchor={mobileMenuAnchor}
            navMenuAnchors={navMenuAnchors}
            onMobileMenuClose={handleMobileMenuClose}
            onNavMenuOpen={handleNavMenuOpen}
            onNavMenuClose={handleNavMenuClose}
          />
        </>
      ) : (
        <DesktopMenu
          navMenuAnchors={navMenuAnchors}
          onNavMenuOpen={handleNavMenuOpen}
          onNavMenuClose={handleNavMenuClose}
        />
      )}

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SocialStack direction="row">
          <SocialIconButton
            onClick={() => handleSocialClick('https://twitter.com/tribeodyssey')}
            aria-label="Twitter"
          >
            <Twitter />
          </SocialIconButton>
          <SocialIconButton
            onClick={() => handleSocialClick('https://instagram.com/tribeodyssey')}
            aria-label="Instagram"
          >
            <Instagram />
          </SocialIconButton>
          <SocialIconButton
            onClick={() => handleSocialClick('https://t.me/tribeodyssey')}
            aria-label="Telegram"
          >
            <Telegram />
          </SocialIconButton>
        </SocialStack>

        <DiscordButton onClick={() => handleSocialClick('https://discord.gg/tribeodyssey')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Discord sx={{ fontSize: 20 }} />
            <GradientText>Join Discord</GradientText>
          </Box>
        </DiscordButton>
      </Box>
    </HeaderWrapper>
  );
};
