export interface Network {
  id: number;
  network?: string;
  name: string;
  chainId: number;
  rpc: string;
  test?: boolean;
  symbol?: string;
  explorer?: string;
  default?: boolean;
}