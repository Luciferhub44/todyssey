declare module 'wagmi' {
  export interface Config {
    chains?: any[];
    transports?: Record<number, any>;
    projectId?: string;
    ssr?: boolean;
  }

  export interface GetAccountResult {
    address: string | undefined;
    isConnected: boolean;
    isConnecting: boolean;
    isDisconnected: boolean;
    status: 'connected' | 'connecting' | 'disconnected';
  }

  export interface ReadContractParameters {
    address: `0x${string}`;
    abi: any;
    functionName: string;
    args?: any[];
  }

  export interface GetPublicClientParameters {
    chainId?: number;
  }

  export interface GetWalletClientParameters {
    chainId?: number;
  }
}

declare module 'wagmi/chains' {
  export * from '@wagmi/core/chains'
}

declare module 'wagmi/actions' {
  export * from '@wagmi/core/actions'
} 