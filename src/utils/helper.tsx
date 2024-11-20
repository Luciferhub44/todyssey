import { BigNumberish, ethers } from "ethers";
import { DefaultChainID } from "../config/constants";

export function shortenHex(hex: string, length = 4): string {
  if (!hex) {
    return "";
  }
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

/**
 * @name parseBalance
 *
 * @param {ethers.BigNumberish} balance
 * @param {number} decimals
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (
  balance: ethers.BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
): string =>
  Number(ethers.formatUnits(balance, decimals)).toFixed(decimalsToDisplay);

export const numberWithCommas = (x: number | string): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const nFormatter = (num: number, digits: number): string => {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
};

export function toWei(ether: string | number): BigNumberish {
  return ethers.parseEther(String(ether));
}

export function toEth(wei: ethers.BigNumberish): string {
  return ethers.formatEther(wei);
}

export function isSameAddress(addr1: string, addr2: string): boolean {
  return (
    ethers.isAddress(addr1) &&
    ethers.isAddress(addr2) &&
    addr1.toLowerCase() === addr2.toLowerCase()
  );
}

export function getBigNumber(value: string | number): bigint {
  return BigInt(value); // Użyj natywnego BigInt
}

export function formatPrice(price: ethers.BigNumberish): string {
  return `${nFormatter(parseFloat(toEth(price)), 4)}`;
}

export function formatPriceUsd(
  price: ethers.BigNumberish,
  usd: number
): string {
  return `${nFormatter(parseFloat(toEth(price)) * usd, 4)}`;
}

export function getEtherScanLink(data: string, type: string): string {
  const prefix =
    DefaultChainID === 4
      ? `https://rinkeby.etherscan.io`
      : `https://etherscan.io`;

  switch (type) {
    case "transaction":
      return `${prefix}/tx/${data}`;
    case "token":
      return `${prefix}/token/${data}`;
    case "address":
    default:
      return `${prefix}/address/${data}`;
  }
}

export const download = (link: string, type: string, name: string): void => {
  const element = document.createElement("a");
  const file = new Blob([link], { type: "image/*" });
  element.href = URL.createObjectURL(file);
  element.download = name;
  element.click();
};

export function sortAndSetCategory(array: string[]): string[] {
  const allTagsWithCount = array.reduce(
    (tagsWithCount, currentTag) => {
      tagsWithCount[currentTag] = (tagsWithCount[currentTag] || 0) + 1;
      return tagsWithCount;
    },
    {} as Record<string, number>
  );

  return Object.keys(allTagsWithCount).sort(
    (a, b) => allTagsWithCount[b] - allTagsWithCount[a]
  );
}

export function ToText(node: string): string {
  const tag = document.createElement("div");
  tag.innerHTML = node;
  return tag.innerText;
}

export function ShortenText(
  text: string,
  startingPoint: number,
  maxLength: number
): string {
  return text.length > maxLength ? text.slice(startingPoint, maxLength) : text;
}
