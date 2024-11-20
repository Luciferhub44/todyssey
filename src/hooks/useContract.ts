import { useMemo } from "react";
import ERC20_ABI from "../config/abi/erc20.json";
import getContract from "../utils/contracts";
import { useWeb3React } from "./useWeb3React";
import { Contract, providers } from "ethers";

// returns null on errors
export function useContract(
  address: string | undefined,
  ABI: any
): Contract | null {
  const { walletClient } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !walletClient) {
      return null;
    }
    try {
      const provider = new providers.Web3Provider(walletClient);
      const signer = provider.getSigner();
      return getContract(address, ABI, signer);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, walletClient]);
}

export function useTokenContract(
  tokenAddress?: string
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI);
}
