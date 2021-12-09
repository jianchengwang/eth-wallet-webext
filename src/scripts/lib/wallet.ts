import { ethers } from "ethers";

export function createWallet(): ethers.Wallet {
  const wallet = ethers.Wallet.createRandom();
  return wallet;
}

export function importMonic(monic: string): ethers.Wallet {
  const wallet = ethers.Wallet.fromMnemonic(monic);
  return wallet;
}

export function importPrivateKey(privateKey: string): ethers.Wallet {
  const wallet = new ethers.Wallet(privateKey);
  return wallet;
}

export async function importKeystoreJson(keystoreJson: string, password: string): Promise<ethers.Wallet> {
  const wallet = await ethers.Wallet.fromEncryptedJson(keystoreJson, password);
  return wallet;
}

export async function exportKeystoreJson(privateKey: string, password: string): Promise<string> {
  const wallet = importPrivateKey(privateKey)
  const keystoreJson = await wallet.encrypt(password);
  return keystoreJson;
}


