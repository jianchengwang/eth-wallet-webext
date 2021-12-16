export interface Token {
  networkId: number;
  type: string;
  address: string;
  symbol: string;
  precision: number;
  balance?: number;
}