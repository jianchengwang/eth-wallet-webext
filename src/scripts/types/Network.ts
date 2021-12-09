export interface Network {
  name: string;
  chainId: number;
  rpc: string;
  test?: boolean;
  symbol?: string;
  explorer?: string;
}