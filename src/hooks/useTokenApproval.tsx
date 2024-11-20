import { useEffect, useState } from "react";
import { zeroAddress } from "../config/constants";
import { getTribeAddress } from "../utils/addressHelpers";
import { useTokenContract } from "./useContract";
import { useWeb3React } from "./useWeb3React";

type TokenType = string | typeof zeroAddress;

const useTokenApproval: (token: TokenType) => boolean = (token: TokenType) => {
  const { account } = useWeb3React();
  const nftContractAddress = getTribeAddress();
  const tokenContract = useTokenContract(token);

  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const contract = await tokenContract;
      const res = contract
        ? await contract.allowance(account, nftContractAddress)
        : BigInt(0);
      setApproved(res !== BigInt(0));
    };

    if (token == zeroAddress) {
      setApproved(true);
    } else if (token && account) {
      fetch();
    }
  }, [token, account]);

  return approved;
};

export default useTokenApproval;
