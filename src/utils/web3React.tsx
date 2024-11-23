import * as React from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { FallbackProvider, JsonRpcProvider } from "ethers";
import { HttpTransport } from "viem";

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

// Helper function to safely get URL from transport
const getUrl = (transport: HttpTransport): string => {
  return (transport as any).url || '';
};

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  if (transport.type === "fallback" && transport.transports) {
    return new FallbackProvider(
      transport.transports.map(
        (transport) => new JsonRpcProvider(getUrl(transport), network)
      )
    );
  }

  return new JsonRpcProvider(getUrl(transport as unknown as HttpTransport), network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId }) as unknown as PublicClient;

  if (!publicClient || !publicClient.chain || !publicClient.transport) {
    return undefined;
  }

  return React.useMemo(
    () => publicClientToProvider(publicClient),
    [publicClient]
  );
}

export function walletClientToSigner(walletClient: WalletClient) {
  if (!walletClient) {
    return null;
  }

  const { account, chain, transport } = walletClient;

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  const provider = new JsonRpcProvider(getUrl(transport), network);
  return provider.getSigner(account.address);
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });

  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient as unknown as WalletClient) : undefined),
    [walletClient]
  );
}
