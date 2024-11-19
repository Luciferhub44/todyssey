import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { zeroAddress } from "../config/constants";
import { getBigNumber } from "../utils/helper";
import { useTokenContract } from "./useContract";
import { useWeb3React } from "./useWeb3React";

const useTokenBalance = (token) => {
  const { account, signer } = useWeb3React();
  const tokenContract = useTokenContract(token);

  const [balance, setBalance] = useState(getBigNumber("0"));

  useEffect(() => {
    const fetch = async () => {
      let tempBalance = ethers.BigNumber.from("0");
      if (token === zeroAddress && signer && account) {
        tempBalance = await signer.getBalance(account);
      } else if (account && tokenContract) {
        tempBalance = await tokenContract.balanceOf(account);
      }

      setBalance(tempBalance);
    };

    if (token && account) {
      fetch();
    }
  }, [token, account]);

  return balance;
};

export default useTokenBalance;
