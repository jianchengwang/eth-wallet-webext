import { ethers } from "ethers";
import { useGlobalState } from "~/logic/state";
import { ERC20ABI } from "~/scripts/constants/abis/ERC20ABI.json";
import { ERC721ABI } from "~/scripts/constants/abis/ERC721ABI.json";
import { TokenType } from '~/scripts/constants/index'

const globalState = useGlobalState();

export async function addContract(contractAddress: string, tokenType: string): Promise<ethers.Contract> {
  if (globalState.provider) {
    let abi = ERC20ABI
    if (tokenType == TokenType.ERC721) {
      abi = ERC721ABI
    }
    let contract = new ethers.Contract(contractAddress, abi, globalState.provider);
    return contract
  }
}


