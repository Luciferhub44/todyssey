import axios from "axios";
import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";
import { getSubgraphEndpoint } from "../utils/addressHelpers";

const usePools = (trigger: number) => {
  const [pools, setPools] = useState([]);
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
      axios
        .post(getSubgraphEndpoint(), { query, variables })
        .then((response) => {
          if (response?.data?.data?.pools) {
            setPools(
              response?.data?.data?.pools
                .map((p) => {
                  const stakedTokenIds = [
                    ...p.tokens1,
                    ...p.tokens2,
                    ...p.tokens3,
                  ].map((o) => o.id);
                  return {
                    id: +p.id,
                    lockDuration: +p.lockDuration,
                    raffleAt: +p.raffleAt,
                    active: p.active,
                    totalLocked: +p.totalLocked,
                    tokens: stakedTokenIds,
                  };
                })
                .filter((p) => p.active)
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetch();
  }, [slowRefresh, trigger]);

  return pools;
};

export default usePools;
