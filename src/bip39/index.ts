import { utils as baseUtils } from "micro-base";
import { pbkdf2, pbkdf2Async } from "noble-hashes/lib/pbkdf2";
import { sha256 } from "noble-hashes/lib/sha256";
import { sha512 } from "noble-hashes/lib/sha512";
import { assertNumber } from "noble-hashes/lib/utils";
import { getRandomBytesSync } from "../random";
import { assertBytes } from "../utils";

const isJapanese = (wordlist: string[]) =>
  wordlist[0] === "\u3042\u3044\u3053\u304f\u3057\u3093"; // Japanese wordlist

function assertMnemonic(mnemonic: string) {
  if (typeof mnemonic !== "string") {
    throw new TypeError(`Invalid mnemonic type: ${typeof mnemonic}`);
  }
}

export function generateMnemonic(
  wordlist: string[],
  strength: number = 128
): string {
  assertNumber(strength);
  if (strength % 32 !== 0) {
    throw new TypeError("Invalid entropy");
  }
  return entropyToMnemonic(getRandomBytesSync(strength / 8), wordlist);
}

const checksum = (entropy: Uint8Array) => {
  // Checksum is ent.length/4 bits long
  const bitsLeft = 8 - entropy.length / 4;
  // Zero rightmost "bitsLeft" bits in byte
  // For example: bitsLeft=4 val=10111101 -> 10110000
  return new Uint8Array([(sha256(entropy)[0] >> bitsLeft) << bitsLeft]);
};

export function getCoder(wordlist: string[]) {
  if (
    !Array.isArray(wordlist) ||
    wordlist.length !== 2 ** 11 ||
    typeof wordlist[0] !== "string"
  ) {
    throw new Error("Worlist: expected array of 2048 strings");
  }
  return baseUtils.chain(
    baseUtils.checksum(1, checksum),
    baseUtils.radix2(11, true),
    baseUtils.alphabet(wordlist)
  );
}

export function mnemonicToEntropy(
  mnemonic: string,
  wordlist: string[]
): Uint8Array {
  assertMnemonic(mnemonic);
  const words = mnemonic.normalize("NFKD").split(" ");
  if (![12, 15, 18, 21, 24].includes(words.length)) {
    throw new Error("Invalid mnemonic");
  }
  const entropy = getCoder(wordlist).decode(words);
  assertBytes(entropy, 16, 20, 24, 28, 32);
  return entropy;
}

export function entropyToMnemonic(
  entropy: Uint8Array,
  wordlist: string[]
): string {
  assertBytes(entropy, 16, 20, 24, 28, 32);
  const words = getCoder(wordlist).encode(entropy);
  return words.join(isJapanese(wordlist) ? "\u3000" : " ");
}

export function validateMnemonic(
  mnemonic: string,
  wordlist: string[]
): boolean {
  try {
    mnemonicToEntropy(mnemonic, wordlist);
  } catch (e) {
    return false;
  }
  return true;
}

const salt = (passphrase = "") => `mnemonic${passphrase}`.normalize("NFKD");

export function mnemonicToSeed(mnemonic: string, passphrase = "") {
  assertMnemonic(mnemonic);
  return pbkdf2Async(sha512, mnemonic.normalize("NFKD"), salt(passphrase), {
    c: 2048,
    dkLen: 64
  });
}

export function mnemonicToSeedSync(mnemonic: string, passphrase = "") {
  assertMnemonic(mnemonic);
  return pbkdf2(sha512, mnemonic.normalize("NFKD"), salt(passphrase), {
    c: 2048,
    dkLen: 64
  });
}
