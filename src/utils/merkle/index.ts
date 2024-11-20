import AccountTree from "./account-tree";

export const getMerkleProof = (whitelist: string[], account: string): string[] => {
  const accountTree = new AccountTree(whitelist);
  let merkleProof: string[];
  try {
    merkleProof = accountTree.getProof(account);
  } catch (e) {
    merkleProof = [];
  }

  return merkleProof;
};
