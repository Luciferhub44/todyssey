import axios from "axios";
import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";
import { useWeb3React } from "./useWeb3React";

interface Item {
  contract: string;
  tokenId: string;
  is_staked: boolean;
  // Add other relevant fields here
  id: string;
}

const useOwnTribes = (trigger: number) => {
  const [tribes, setTribes] = useState<Item[]>([]);
  const [stakedTribes, setStakedTribes] = useState<Item[]>([]);
  const { slowRefresh } = useRefresh();
  const { account } = useWeb3React();

  useEffect(() => {
    const fetch = async () => {
      axios
        .get("/item", {
          params: {
            owner: account?.toLowerCase(),
            limit: 1000,
          },
        })
        .then((response) => {
          const items: Item[] = (response?.data?.items || []).map((item: any) => ({
            ...item,
            id: `${item.contract}-${item.tokenId}`,
          }));
          setTribes(items.filter((item) => !item.is_staked));
          setStakedTribes(items.filter((item) => item.is_staked));
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (account) {
      fetch();
    }
  }, [slowRefresh, account, trigger]);

  return {
    tribes,
    stakedTribes,
  };
};

export default useOwnTribes;
