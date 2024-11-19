import { useEffect, useState } from "react";
import { zeroAddress } from "../config/constants";
import { getTribeAddress } from "../utils/addressHelpers";
import { useTokenContract } from "./useContract";
import { useWeb3React } from "./useWeb3React";
import { BigNumber } from "ethers";

const useTokenApproval = (token) => {
  const { account } = useWeb3React();
  const nftContractAddress = getTribeAddress();
  const tokenContract = useTokenContract(token);

  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = tokenContract
        ? await tokenContract.allowance(account, nftContractAddress)
        : BigNumber.from(0);
      setApproved(!res.isZero());
    };

    if (token == zeroAddress) {
      setApproved(true);
    } else {
      if (token && account) {
        fetch();
      }
    }
  }, [token, account]);

  return approved;
};

export default useTokenApproval;
