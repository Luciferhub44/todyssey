import * as React from "react";
import { getPublicClient, getWalletClient } from "wagmi/actions";
import { BrowserProvider, JsonRpcProvider, type Signer } from "ethers";
import { HttpTransport } from "viem";
import type { Config } from "wagmi";
import { wagmiConfig } from '../config/wagmi';

// Define types
interface Chain {
  id: number;
  name: string;
  contracts?: {
    ensRegistry?: {
      address: string;
    };
  };
}

interface Transport {
  type: string;
  transports?: HttpTransport[];
}

interface PublicClient {
  chain: Chain;
  transport: Transport;
}

interface WalletClient {
  account: { address: string };
  chain: Chain;
  transport: HttpTransport;
}

interface ProviderConfig {
  chainId?: number;
  config?: Config;
}

type SupportedChainId = 1 | 5; // mainnet and goerli

// Helper function to safely get URL from transport
const getUrl = (transport: HttpTransport): string => {
  if ('url' in transport && transport.url) return transport.url;
  if ('value' in transport && transport.value?.url) return transport.value.url;
  return '';
};

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  if (transport.type === "fallback" && transport.transports) {
    const providerList = transport.transports.map(
      (t) => new JsonRpcProvider(getUrl(t), network)
    );
    return providerList[0]; // Use first provider as fallback
  }

  return new JsonRpcProvider(getUrl(transport as unknown as HttpTransport), network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: SupportedChainId } = {}) {
  const publicClient = getPublicClient(wagmiConfig, { chainId }) as unknown as PublicClient;

  if (!publicClient || !publicClient.chain || !publicClient.transport) {
    return undefined;
  }

  return React.useMemo(
    () => publicClientToProvider(publicClient),
    [publicClient]
  );
}

export async function walletClientToSigner(walletClient: WalletClient): Promise<Signer | null> {
  if (!walletClient) {
    return null;
  }

  const { account, chain, transport } = walletClient;
  const provider = new BrowserProvider(transport as any);
  return provider.getSigner(account.address);
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: SupportedChainId } = {}) {
  const walletClient = getWalletClient(wagmiConfig, { chainId });

  return React.useMemo(
    () => walletClient ? walletClientToSigner(walletClient as unknown as WalletClient) : undefined,
    [walletClient]
  );
}
