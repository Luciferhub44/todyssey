import { Contract } from 'ethers'
import { useAccount, useWalletClient } from 'wagmi'
import { useState, useEffect } from 'react'
import ERC20_ABI from '../config/abi/erc20.json'

export function useTokenBalance(tokenAddress: string) {
  const { address: account } = useAccount()
  const { data: walletClient } = useWalletClient()
  
  const [balance, setBalance] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getBalance = async () => {
    if (!walletClient || !account || !tokenAddress) return null
    
    try {
      setLoading(true)
      const provider = walletClient.transport.provider
      const contract = new Contract(tokenAddress, ERC20_ABI, provider)
      const result = await contract.balanceOf(account)
      setBalance(result.toString())
    } catch (error) {
      console.error('Error getting balance:', error)
      setBalance(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBalance()
  }, [account, tokenAddress, walletClient])

  return { balance, loading, refetch: getBalance }
}
