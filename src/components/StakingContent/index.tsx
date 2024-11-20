import { Box, Button, Typography,  Grid, Card } from "@mui/material";
import { useAccount, useConnect, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import  { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

interface NFT {
  id: number;
  tokenId: string;
  contract: string;
  is_staked: boolean;
}

const StakingContent = () => {
 // const theme = useTheme();
 // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  //const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const [activeTab, setActiveTab] = useState(0); // 0: All, 1: Staked
  const [selectedNFTs, setSelectedNFTs] = useState<number[]>([]);
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [stakedNFTs, setStakedNFTs] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    try {
      await connect({ connector: injected() });
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  const fetchNFTs = async () => {
   if (!address) {
     return;
   }
    
    try {
      const response = await axios.get(`/api/nfts/${address}`);
      setOwnedNFTs(response.data.owned || []);
      setStakedNFTs(response.data.staked || []);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      toast.error('Failed to fetch NFTs');
    }
  };

  const handleStake = async () => {
    if (!address || selectedNFTs.length === 0) {
      return;
    }

    try {
      setIsLoading(true);
      const message = JSON.stringify({
        ids: selectedNFTs,
        address: address.toLowerCase(),
      });

      const signature = await signMessageAsync({ message });

      await axios.post('/api/stake', {
        address,
        signature,
        ids: selectedNFTs,
      });

      toast.success(`Successfully staked ${selectedNFTs.length} NFT(s)`);
      setSelectedNFTs([]);
      fetchNFTs();
    } catch (error) {
      console.error('Staking error:', error);
      toast.error('Failed to stake NFTs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!address || selectedNFTs.length === 0) {
      return;
    }

    try {
      setIsLoading(true);
      const message = JSON.stringify({
        ids: selectedNFTs,
        address: address.toLowerCase(),
      });

      const signature = await signMessageAsync({ message });

      await axios.post('/api/unstake', {
        address,
        signature,
        ids: selectedNFTs,
      });

      toast.success(`Successfully unstaked ${selectedNFTs.length} NFT(s)`);
      setSelectedNFTs([]);
      fetchNFTs();
    } catch (error) {
      console.error('Unstaking error:', error);
      toast.error('Failed to unstake NFTs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchNFTs();
    }
  }, [address]);

  const displayedNFTs = activeTab === 0 ? ownedNFTs : stakedNFTs;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{ 
        height: '100%', 
        p: 3,
        bgcolor: "#181818",
        borderRadius: 1,
        border: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {!isConnected ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
          <Typography
            variant="body1"
            sx={{
              color: "rgba(246, 246, 247, 1)",
              mb: 4,
              textAlign: "center",
            }}
          >
            To stake you need to connect your wallet.
          </Typography>
          <Button
            variant="contained"
            onClick={handleConnect}
            sx={{
              bgcolor: "#ff0008",
              '&:hover': { bgcolor: "#dd0007" },
            }}
          >
            Connect Wallet
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box display="flex" gap={2}>
              <Button
                onClick={() => setActiveTab(0)}
                sx={{
                  color: activeTab === 0 ? 'primary.main' : 'text.secondary',
                  borderBottom: activeTab === 0 ? 2 : 0,
                  borderColor: 'primary.main',
                  borderRadius: 0,
                }}
              >
                All NFTs
              </Button>
              <Button
                onClick={() => setActiveTab(1)}
                sx={{
                  color: activeTab === 1 ? 'primary.main' : 'text.secondary',
                  borderBottom: activeTab === 1 ? 2 : 0,
                  borderColor: 'primary.main',
                  borderRadius: 0,
                }}
              >
                Staked
              </Button>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {displayedNFTs.map((nft) => (
              <Grid item xs={6} sm={4} md={3} key={nft.id}>
                <Card
                  onClick={() => {
                    const newSelected = selectedNFTs.includes(nft.id)
                      ? selectedNFTs.filter(id => id !== nft.id)
                      : [...selectedNFTs, nft.id];
                    setSelectedNFTs(newSelected);
                  }}
                  sx={{
                    cursor: 'pointer',
                    border: selectedNFTs.includes(nft.id) ? 2 : 0,
                    borderColor: 'primary.main',
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src={`https://cdn.0xworld.io/tribe-images/${nft.tokenId}.png`}
                    alt={`NFT #${nft.tokenId}`}
                    sx={{ width: '100%', height: 'auto' }}
                  />
                  {nft.is_staked && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'error.main',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      🔒
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              bgcolor: '#181818',
              p: 2,
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography>
              Selected: {selectedNFTs.length} of {displayedNFTs.length}
            </Typography>
            <Button
              variant="contained"
              onClick={activeTab === 0 ? handleStake : handleUnstake}
              disabled={selectedNFTs.length === 0 || isLoading}
              sx={{
                bgcolor: "#ff0008",
                '&:hover': { bgcolor: "#dd0007" },
              }}
            >
              {isLoading ? 'Processing...' : activeTab === 0 ? 'Stake' : 'Unstake'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default StakingContent; 