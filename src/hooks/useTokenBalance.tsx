import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { zeroAddress } from "../config/constants";
import { getBigNumber } from "../utils/helper";
import { useTokenContract } from "./useContract";
import { useWeb3React } from "./useWeb3React";
import { BigNumber } from "ethers";

type Address = string;
type BigNumberish = ethers.BigNumberish;

interface TokenBalanceHook {
  (token: Address): BigNumber;
}

const useTokenBalance: TokenBalanceHook = (token: Address) => {
  const { account, signer } = useWeb3React();
  const tokenContract = useTokenContract(token);

  const [balance, setBalance] = useState<BigNumber>(getBigNumber("0"));

  useEffect(() => {
    const fetch = async () => {
      try {
        let tempBalance: BigNumber = await .BigNumber.from("0");
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
