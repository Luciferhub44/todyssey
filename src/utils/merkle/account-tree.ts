import { ethers } from "ethers";
import MerkleTree from "./markle-tree";

export default class AccountTree {
  private readonly tree: MerkleTree;

  constructor(accounts: string[]) {
    this.tree = new MerkleTree(
      accounts.map((account) => {
        return AccountTree.toNode(account);
      })
    );
  }

  public static verifyProof(
    account: string,
    proof: Buffer[],
    root: Buffer
  ): boolean {
    let pair = AccountTree.toNode(account);
    for (const item of proof) {
      pair = MerkleTree.combinedHash(pair, item);
    }

    return pair.equals(root);
  }

  // keccak256(abi.encode(account))
  public static toNode(account: string): Buffer {
    // In v6, utility functions are directly part of the ethers object
    return Buffer.from(
      ethers.keccak256(ethers.AbiCoder.defaultAbiCoder().encode(["address"], [account])).substr(2),
      "hex"
    );
  }

  public getHexRoot(): string {
    return this.tree.getHexRoot();
  }

  // returns the hex bytes32 values of the proof
  public getProof(account: string): string[] {
    return this.tree.getHexProof(AccountTree.toNode(account));
  }
}