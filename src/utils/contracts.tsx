import { Contract, Interface } from "ethers";
import { JsonRpcSigner } from "ethers";

export default function getContract(
  address: string,
  ABI: Interface,
  signer?: JsonRpcSigner
): Contract {
  if (!signer) {
    throw new Error("No signer");
  }
  return new Contract(address, ABI, signer);
}
``