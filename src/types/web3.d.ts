declare module 'ethers' {
  export interface Signer {
    getAddress(): Promise<string>;
    signMessage(message: string): Promise<string>;
  }

  export class JsonRpcProvider {
    constructor(url: string, network?: any);
    getSigner(address?: string): Promise<Signer>;
  }

  export class BrowserProvider {
    constructor(ethereum: any, network?: any);
    getSigner(address?: string): Promise<Signer>;
  }

  export class Interface {
    constructor(abi: any[]);
    encodeFunctionData(functionFragment: string, values: any[]): string;
    decodeFunctionResult(functionFragment: string, data: string): any[];
  }

  export class Contract {
    constructor(address: string, abi: any[], signerOrProvider: Signer | JsonRpcProvider);
    connect(signerOrProvider: Signer | JsonRpcProvider): Contract;
  }
}

declare module 'viem' {
  export interface HttpTransport {
    url?: string;
    value?: {
      url: string;
    };
  }
} 