import { useAccount, useChainId, useWalletClient } from "wagmi";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { chains } from "../config/constants";

export function useWeb3React() {
  const chainId: number | undefined = useChainId();
  const isSupported = chains.some((chain) => chain.id === chainId);
  const { address, connector, isConnected, isConnecting } = useAccount();
  const { data: walletClient } = useWalletClient();

  return {
    chainId,
    isSupported,
    account: isConnected ? address : null,
    isConnected,
    isConnecting,
    connector,
    walletClient,
  };
}

export function useWalletConnect() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  return {
    openConnectModal,
    openAccountModal,
    openChainModal,
  };
}
