import { ethers } from "ethers";
import { useGlobalState } from "~/logic/state";

const globalState = useGlobalState();

export async function getBalance(address: string, precision: number = 18): Promise<ethers.BigNumberish> {
  console.info(address)
  if (globalState.provider) {
    let balance = await globalState.provider.getBalance(address)
    let balanceStr = ethers.utils.formatUnits(balance, precision);
    return balanceStr;
  }
  return ""
}


