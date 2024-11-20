import axios from "axios";
import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";
import { getSubgraphEndpoint } from "../utils/addressHelpers";

interface Pool {
  id: number;
  lockDuration: number;
  raffleAt: number;
  totalLocked: number;
  active: boolean;
  tokens: string[];
}

const usePools = (trigger: number): Pool[] => {
  const [pools, setPools] = useState<Pool[]>([]);
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    const fetch = async () => {
      const query = `
        query allPools {
          pools {
            id
            lockDuration
            raffleAt
            totalLocked
            raffled
            active
            tokens1: tokens (first: 1000) {
              id
            }
            tokens2: tokens (skip: 1000, first: 1000) {
              id
            }
            tokens3: tokens (skip: 2000, first: 1000) {
              id
            }
          }
        }
      `;

      const variables = {};
      try {
        const response = await axios.post(getSubgraphEndpoint(), { query, variables });
        if (response?.data?.data?.pools) {
          const fetchedPools: Pool[] = response.data.data.pools
            .map((p: any) => {
              const stakedTokenIds = [
                ...p.tokens1,
                ...p.tokens2,
                ...p.tokens3,
              ].map((o: any) => o.id);
              return {
                id: +p.id,
                lockDuration: +p.lockDuration,
                raffleAt: +p.raffleAt,
                active: p.active,
                totalLocked: +p.totalLocked,
                tokens: stakedTokenIds,
              };
            })
            .filter((p: Pool) => p.active);
          setPools(fetchedPools);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [slowRefresh, trigger]);

  return pools;
};

export default usePools;
