import { useMemo } from "react";
import ERC20_ABI from "../config/abi/erc20.json";
import getContract from "../utils/contracts";
import { useWeb3React } from "./useWeb3React";
import { Contract, ethers } from "ethers";

// returns null on errors
export async function useContract(
  address: string | undefined,
  ABI: any
): Promise<Contract | null> {
  const { walletClient } = useWeb3React();

  return useMemo(async () => {
    if (!address || !ABI || !walletClient) {
      return null;
    }
    try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      return await getContract(address, ABI, signer);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, walletClient]);
}

export async function useTokenContract(
  tokenAddress?: string
): Promise<Contract | null> {
  return await useContract(tokenAddress, ERC20_ABI);
}
