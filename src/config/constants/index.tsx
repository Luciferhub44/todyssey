import { mainnet, goerli } from 'wagmi/chains';
import { type Chain } from 'wagmi/chains';

export const zeroAddress = "0x0000000000000000000000000000000000000000";

export const DefaultChainID = parseInt(
  import.meta.env.VITE_APP_NETWORK_ID || "1",
  10
);

export const chains: Chain[] = [mainnet, goerli];

export const ChainList = {
  1: "Mainnet",
  5: "Goerli Testnet",
} as const;

export type SupportedChainId = keyof typeof ChainList;
