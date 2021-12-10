import { reactive } from 'vue';
import { createGlobalState } from '@vueuse/core'
import { currentNetwork } from "~/logic/storage"
import { ethers } from "ethers";

type GlobalState = {
  chainId: number;
  provider: ethers.providers.Provider;
  password: string;
  isLogin: false;
  updateNetworkProvider: () => void;
}

const globalState: GlobalState = {
  chainId: 1,
  provider: new ethers.providers.InfuraProvider("mainnet", "fda03bb99a764dca90b2400ecff9ef5a"),
  password: "",
  isLogin: false,
  updateNetworkProvider: () => {
    if (currentNetwork.value.chainId != globalState.chainId) {
      globalState.chainId = currentNetwork.value.chainId;
      if (currentNetwork.value.network) {
        globalState.provider = new ethers.providers.InfuraProvider(currentNetwork.value.network, "fda03bb99a764dca90b2400ecff9ef5a");
      } else {
        globalState.provider = new ethers.providers.JsonRpcProvider(currentNetwork.value.rpc);
      }
    }
  },
}

export const useGlobalState = createGlobalState(
  () => globalState
)