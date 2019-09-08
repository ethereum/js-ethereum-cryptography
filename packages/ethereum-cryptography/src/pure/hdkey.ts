interface Versions {
  private: number;
  public: number;
}

declare class HDKey {
  public static HARDENED_OFFSET: number;
  public static fromMasterSeed(seed: Buffer, versions: Versions): HDKey;
  public static fromExtendedKey(base58key: string, versions: Versions): HDKey;
  public static fromJSON(json: { xpriv: string }): HDKey;

  public versions: Versions;
  public depth: number;
  public index: number;
  public chainCode: Buffer | null;
  public privateKey: Buffer | null;
  public publicKey: Buffer | null;
  public fingerprint: number;
  public parentFingerprint: number;
  public pubKeyHash: Buffer | undefined;
  public identifier: Buffer | undefined;
  public privateExtendedKey: string;
  public publicExtendedKey: string;

  private constructor(versios: Versions);
  public derive(path: string): HDKey;
  public deriveChild(index: number): HDKey;
  public sign(hash: Buffer): Buffer;
  public verify(hash: Buffer, signature: Buffer): boolean;
  public wipePrivateData(): this;
  public toJSON(): { xpriv: string; xpub: string };
}

const hdkey: typeof HDKey = require("./vendor/hdkey-without-crypto");

export = hdkey;
