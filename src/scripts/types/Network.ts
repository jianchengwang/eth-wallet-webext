export interface Network {
  network?: string;
  name: string;
  chainId: number;
  rpc: string;
  test?: boolean;
  symbol?: string;
  explorer?: string;
}