import { wordlist as englishWordlist } from "../../src/bip39/wordlists/english";
import { wordlist as spanishWordlist } from "../../src/bip39/wordlists/spanish";
import * as bip39 from "../../src/pure/bip39";
import { createTests } from "../test-vectors/bip39";

createTests(
  bip39.generateMnemonic,
  bip39.mnemonicToEntropy,
  bip39.entropyToMnemonic,
  bip39.validateMnemonic,
  bip39.mnemonicToSeed,
  bip39.mnemonicToSeedSync,
  englishWordlist,
  spanishWordlist
);
