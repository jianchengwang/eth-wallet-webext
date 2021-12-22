import { createGlobalState } from '@vueuse/core'
import { currentNetwork, networks } from "~/logic/storage"
import { ethers } from "ethers"
import { Network } from '~/scripts/types/Network'

type GlobalState = {
  networkId: number;
  provider: ethers.providers.Provider;
  password: string;
  isLogin: false;
  contracts: ethers.Contract[],
  changeNetworkProvider: () => void;
  addContract: (contract: ethers.Contract) => void;
}

const globalState: GlobalState = {
  networkId: 1,
  provider: new ethers.providers.InfuraProvider("mainnet", "fda03bb99a764dca90b2400ecff9ef5a"),
  password: "",
  isLogin: false,
  contracts: [],
  changeNetworkProvider: () => {
    if (currentNetwork.value.id != globalState.networkId) {
      globalState.networkId = currentNetwork.value.id
      if (currentNetwork.value.network) {
        globalState.provider = new ethers.providers.InfuraProvider(currentNetwork.value.network, "fda03bb99a764dca90b2400ecff9ef5a")
      } else {
        globalState.provider = new ethers.providers.JsonRpcProvider(currentNetwork.value.rpc)
      }
    }
  },
  addContract: (contract: ethers.Contract) => {

  }
}

export const useGlobalState = createGlobalState(
  () => globalState
)