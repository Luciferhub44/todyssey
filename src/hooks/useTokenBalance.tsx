import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { zeroAddress } from "../config/constants";
import { getBigNumber } from "../utils/helper";
import { useTokenContract } from "./useContract";
import { useWeb3React } from "./useWeb3React";

type Address = string;

interface TokenBalanceHook {
  (token: Address): BigInt;
}

const useTokenBalance: TokenBalanceHook = (token: Address) => {
  const { account, signer } = useWeb3React();
  const tokenContract = useTokenContract(token);

  const [balance, setBalance] = useState<BigInt>(getBigNumber("0"));

  useEffect(() => {
    const fetch = async () => {
      try {
        let tempBalance: BigInt = await BigInt("0");
        if (token === zeroAddress && signer && account) {
          tempBalance = await signer.getBalance(account);
        } else if (account && tokenContract) {
          tempBalance = await tokenContract.balanceOf(account);
        }

        setBalance(tempBalance);
      } catch (error) {
        console.error("Error fetching token balance:", error);
      }
    };

    if (token && account) {
      fetch();
    }
  }, [token, account, signer, tokenContract]);

  return balance;
};

export default useTokenBalance;
