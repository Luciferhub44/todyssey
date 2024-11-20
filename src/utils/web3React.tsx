import * as React from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { FallbackProvider, JsonRpcProvider } from "ethers";
import { HttpTransport } from "viem";

// Definiowanie typów Chain i Transport
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
  url: string;
  transports?: Array<{ value: { url: string } }>;
  value?: { url: string };
}

interface PublicClient {
  chain: Chain;
  transport: Transport;
}

interface WalletClient {
  account: { address: string };
  chain: Chain;
  transport: any; // Możesz zdefiniować bardziej szczegółowy typ
}

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === "fallback") {
    return new FallbackProvider(
      (transport.transports as unknown as HttpTransport[]).map(
        (transport) => new JsonRpcProvider(transport.url, network)
      )
    );
  }

  return new JsonRpcProvider(transport.url, network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId }) as unknown as PublicClient;

  // Sprawdzenie, czy publicClient jest prawidłowy
  if (!publicClient || !publicClient.chain || !publicClient.transport) {
    return undefined; // lub możesz zwrócić domyślny provider
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

  const provider = new JsonRpcProvider(transport.url, network); // Upewnij się, że transport ma url
  return provider.getSigner(account.address);
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });

  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}
