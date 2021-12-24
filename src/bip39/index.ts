import { pbkdf2, pbkdf2Async } from "@noble/hashes/pbkdf2";
import { sha256 } from "@noble/hashes/sha256";
import { sha512 } from "@noble/hashes/sha512";
import { assertBytes, assertNumber, randomBytes } from "@noble/hashes/utils";
import { utils as baseUtils } from "micro-base";

const isJapanese = (wordlist: string[]) =>
  wordlist[0] === "\u3042\u3044\u3053\u304f\u3057\u3093"; // Japanese wordlist

// Normalization replaces equivalent sequences of characters
// so that any two texts that are equivalent will be reduced
// to the same sequence of code points, called the normal form of the original text.
const nfkd = (str: string) => str.normalize("NFKD");

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
  return entropyToMnemonic(randomBytes(strength / 8), wordlist);
}

const checksum = (entropy: Uint8Array) => {
  // Checksum is ent.length/4 bits long
  const bitsLeft = 8 - entropy.length / 4;
  // Zero rightmost "bitsLeft" bits in byte
  // For example: bitsLeft=4 val=10111101 -> 10110000
  return new Uint8Array([(sha256(entropy)[0] >> bitsLeft) << bitsLeft]);
};

function getCoder(wordlist: string[]) {
  if (
    !Array.isArray(wordlist) ||
    wordlist.length !== 2 ** 11 ||
    typeof wordlist[0] !== "string"
  ) {
    throw new Error("Worlist: expected array of 2048 strings");
  }
  for (const i of wordlist) {
    if (typeof i !== "string") {
      throw new Error(`Wordlist: non-string element: ${i}`);
    }
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
  const words = nfkd(mnemonic).split(" ");
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

const salt = (passphrase = "") => nfkd(`mnemonic${passphrase}`);

export function mnemonicToSeed(mnemonic: string, passphrase = "") {
  assertMnemonic(mnemonic);
  return pbkdf2Async(sha512, nfkd(mnemonic), salt(passphrase), {
    c: 2048,
    dkLen: 64
  });
}

export function mnemonicToSeedSync(mnemonic: string, passphrase = "") {
  assertMnemonic(mnemonic);
  return pbkdf2(sha512, nfkd(mnemonic), salt(passphrase), {
    c: 2048,
    dkLen: 64
  });
}
