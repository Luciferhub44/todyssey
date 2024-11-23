import { Box, Stack, IconButton, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Twitter,
  Telegram,
  Instagram,
  Wallet,
} from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useConnect, useAccount, useDisconnect } from 'wagmi';
const logo = "/logored.png"
import { MobileMenu } from "./MobileMenu";
import { GradientText } from "./StyledComponents";
import { Discord } from "../icons/Discord";
import { DesktopMenu } from "./DesktopMenu";
import { mainNavLinks } from "../../types/nav";
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
    text: "Navigation",
    links: mainNavLinks,
  },
  {
    text: "Assets",
    links: [
      { name: "4K Tribe", path: "/4ktribe" },
      { name: "Wallpapers", path: "/wallpaper" },
      { name: "ENS", path: "/ens" },
      { name: "Tribal Beats", path: "/beats" },
      { name: "Tribe 19 Checker", path: "/checker" },
    ],
  },
  {
    text: "Marketplace",
    links: [
      { name: "Marketplace", path: "/marketplace" },
      { name: "Opensea", path: "https://opensea.io/tribe", external: true },
      {
        name: "Looksrare",
        path: "https://looksrare.org/tribe",
        external: true,
      },
      { name: "X2Y2", path: "https://x2y2.io/tribe", external: true },
    ],
  },
  {
    text: "Staking",
    links: [
      { name: "Stake Apes", path: "/staking" },
      { name: "Raffles", path: "/raffles" },
      { name: "Winners", path: "/winners" },
    ],
  },
  {
    text: "The Council",
    links: [{ name: "Council", path: "/council" }],
  },
];

// Add type safety for social links
interface SocialLink {
  url: string;
  icon: React.ComponentType;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { url: "https://twitter.com/tribeodyssey", icon: Twitter, label: "Twitter" },
  { url: "https://t.me/tribeodyssey", icon: Telegram, label: "Telegram" },
  {
    url: "https://instagram.com/tribeodyssey",
    icon: Instagram,
    label: "Instagram",
  },
  // ... other social links
];

// Styled components
const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 4),
  height: 80,
  position: "relative",
  zIndex: 1100,
  maxWidth: "1440px",
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 2),
  },
}));

const LogoImage = styled("img")<{ theme?: Theme }>(({ theme }) => ({
  height: 32,
  width: "auto",
  cursor: "pointer",
  marginRight: theme?.spacing?.(4) || '32px',
  [`${theme?.breakpoints?.down('sm')}`]: {
    height: 24,
    marginRight: theme?.spacing?.(2) || '16px',
  },
}));

const SocialIconButton = styled(IconButton)(() => ({
  padding: 8,
  color: "rgba(255, 255, 255, 0.7)",
  transition: "all 0.2s ease",
  "&:hover": {
    color: "white",
    transform: "translateY(-2px)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
}));

const SocialStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginLeft: "auto",
  marginRight: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const DiscordButton = styled(Box)(() => ({
  padding: "10px 24px",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background:
    "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },

  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: "rgba(255, 255, 255, 0.2)",

    "&::before": {
      opacity: 1,
    },
  },
}));

const ConnectWalletButton = styled(Box)(() => ({
  padding: "10px 24px",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background:
    "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
}));

export const Header = (): JSX.Element => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleNavMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
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
    window.open(url, "_blank");
  };

  const handleConnect = async () => {
    const connector = connectors[0]; // Usually injected connector (MetaMask)
    if (connector) {
      await connect({ connector });
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <HeaderWrapper>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LogoImage src={logo} alt="TRIBE Logo" onClick={() => navigate("/")} />

        {!isMobile && (
          <DesktopMenu
            navMenuAnchors={navMenuAnchors}
            onNavMenuOpen={handleNavMenuOpen}
            onNavMenuClose={handleNavMenuClose}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          ml: "auto",
        }}
      >
        <SocialStack direction="row">
          {SOCIAL_LINKS.map((social) => (
            <SocialIconButton
              key={social.label}
              onClick={() => handleSocialClick(social.url)}
              aria-label={social.label}
            >
              <social.icon />
            </SocialIconButton>
          ))}
        </SocialStack>

        {location.pathname === "/ens" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              ml: "auto",
            }}
          >
            {!isConnected ? (
              <ConnectWalletButton onClick={handleConnect}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Wallet sx={{ fontSize: 20 }} />
                  <GradientText>Connect Wallet</GradientText>
                </Box>
              </ConnectWalletButton>
            ) : (
              <ConnectWalletButton onClick={handleDisconnect}>
                <GradientText>
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </GradientText>
              </ConnectWalletButton>
            )}
          </Box>
        )}

        {isMobile && (
          <IconButton
            onClick={handleMobileMenuOpen}
            sx={{
              color: "white",
              ml: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {isMobile && (
        <MobileMenu
          mobileMenuAnchor={mobileMenuAnchor}
          navMenuAnchors={navMenuAnchors}
          onMobileMenuClose={handleMobileMenuClose}
          onNavMenuOpen={handleNavMenuOpen}
          onNavMenuClose={handleNavMenuClose}
        />
      )}
    </HeaderWrapper>
  );
};
