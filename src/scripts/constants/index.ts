import { Network } from '~/scripts/types/Network'

const Ethereum: Network = {
  name: '以太坊 Ethereum 主网络',
  chainId: 1,
  rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  test: false,
  symbol: 'ETH',
  explorer: 'https://etherscan.io'
};

const Ropsten: Network = {
  name: 'Ropsten 测试网络',
  chainId: 3,
  rpc: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  test: true,
  symbol: 'ETH',
  explorer: 'https://ropsten.etherscan.io'
};

const Rinkeby: Network = {
  name: 'Rinkeby 测试网络',
  chainId: 4,
  rpc: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  test: true,
  symbol: 'ETH',
  explorer: 'https://rinkeby.etherscan.io'
};

const Goerli: Network = {
  name: 'Goerli 测试网络',
  chainId: 5,
  rpc: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  test: true,
  symbol: 'ETH',
  explorer: 'https://goerli.etherscan.io'
}

const Kovan: Network = {
  name: 'Kovan 测试网络',
  chainId: 42,
  rpc: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  test: true,
  symbol: 'ETH',
  explorer: 'https://kovan.etherscan.io'
}

const BscTestnet: Network = {
  name: 'Bsc 测试网络',
  chainId: 97,
  rpc: 'https://speedy-nodes-nyc.moralis.io/03a2a57cae4f839aae2eb484/bsc/testnet',
  test: true,
  symbol: 'BNB',
  explorer: 'https://testnet.bscscan.com/'
}

const ShangChain: Network = {
  name: '熵链测试网络',
  chainId: 1024,
  rpc: 'http://nps.shang-chain.com:18027',
  test: true,
  symbol: 'BNB',
  explorer: 'http://nps.shang-chain.com:18028'
}

export const DEFAULT_NETWORKS = [
  Ethereum,
  Ropsten,
  Rinkeby,
  Goerli,
  Kovan,
  BscTestnet,
  ShangChain
]

//实现721接口
export const _INTERFACE_ID_ERC721 = "0x80ac58cd";
//实现可列举接口
export const _INTERFACE_ID_ERC721_ENUMERABLE = "0x780e9d63";
//实现元数据接口
export const _INTERFACE_ID_ERC721_METADATA = "0x5b5e139f";
//实现获取所有ID接口
export const _INTERFACE_ID_TOKEN_BALANCES = "0xc84aae17";