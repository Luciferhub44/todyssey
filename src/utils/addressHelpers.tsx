import addresses from "../config/constants/contracts";

interface Address {
  [key: string]: string;
}

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_NETWORK_ID || "1";
  return address[chainId] || address["1"];
};

export const getMulticallAddress = (): string => {
  return getAddress(addresses.multiCall);
};

export const getTribeAddress = (): string => {
  return getAddress(addresses.tribe);
};

export const getApeAddress = (): string => {
  return getAddress(addresses.ape);
};

export const getEnsRegistrarAddress = (): string => {
  return getAddress(addresses.ensRegistrar);
};

export const getStakingAddress = (): string => {
  return getAddress(addresses.staking);
};

export const getSubgraphEndpoint = (): string => {
  const chainId = process.env.REACT_APP_NETWORK_ID || "1";
  if (+chainId === 1) {
    return "https://api.thegraph.com/subgraphs/name/0xapes/tribe-subgraph-mainnet";
  } else {
    return "https://api.thegraph.com/subgraphs/name/0xapes/tribe-subgraph-goerli";
  }
};
