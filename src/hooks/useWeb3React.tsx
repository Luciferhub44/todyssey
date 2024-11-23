import { useAccount, useChainId, useWalletClient, useConnect, useDisconnect } from "wagmi";
import { chains } from "../config/constants";
import type { Connector } from "wagmi";

export function useWeb3React() {
  const chainId: number | undefined = useChainId();
  const isSupported = chains.some((chain) => chain.id === chainId);
  const { address, connector, isConnected, isConnecting } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async (connector: Connector) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return {
    chainId,
    isSupported,
    account: isConnected ? address : null,
    isConnected,
    isConnecting,
    connector,
    walletClient,
    connect: handleConnect,
    disconnect
  };
}

export function useWalletConnect() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const handleConnect = async () => {
    const connector = connectors[0];
    if (connector) {
      try {
        await connect({ connector });
      } catch (error) {
        console.error('Connection error:', error);
      }
    }
  };

  return {
    connect: handleConnect,
    disconnect,
    address
  };
}
