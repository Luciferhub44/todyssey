import { useMemo } from "react";
import { Contract, Interface, BrowserProvider } from "ethers";
import ERC20_ABI from "../config/abi/erc20.json";
import { useWeb3React } from "./useWeb3React";

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
      const provider = new BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const iface = new Interface(ABI);
      return new Contract(address, iface.format(), signer);
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
