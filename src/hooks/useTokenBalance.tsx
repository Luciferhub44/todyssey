import { useState, useEffect } from 'react';
import { getAccount, readContract } from 'wagmi/actions';
import { Interface } from 'ethers';
import ERC20_ABI from '../config/abi/erc20.json';
import { wagmiConfig } from '../config/wagmi';

export function useTokenBalance(tokenAddress: string) {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getBalance = async () => {
    try {
      setLoading(true);
      const account = getAccount(wagmiConfig);
      if (!account.address || !tokenAddress) return null;

      const erc20Interface = new Interface(ERC20_ABI);
      const result = await readContract(wagmiConfig, {
        address: tokenAddress as `0x${string}`,
        abi: erc20Interface,
        functionName: 'balanceOf',
        args: [account.address],
      });

      setBalance(result ? result.toString() : null);
    } catch (error) {
      console.error('Error getting balance:', error);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBalance();
  }, [tokenAddress]);

  return { balance, loading, refetch: getBalance };
}
