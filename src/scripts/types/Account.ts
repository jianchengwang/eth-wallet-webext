import { Token } from '~/scripts/types/Token'


export interface Account {
  name: string;
  address: string;
  publicKey: string;
  mnemonic: string;
  mnemonicCiphertext: string;
  privateKey: string;
  privateKeyCiphertext: string;

  balance?: number;
  nonce?: number;
  tokens?: Array<Token>;
}