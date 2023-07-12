// Hashes
import { sha256 } from "ethereum-cryptography/sha256.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { ripemd160 } from "ethereum-cryptography/ripemd160.js";
import { blake2b } from "ethereum-cryptography/blake2b.js";

// KDFs
import { pbkdf2Sync } from "ethereum-cryptography/pbkdf2.js";
import { scryptSync } from "ethereum-cryptography/scrypt.js";

// Random
import { getRandomBytesSync } from "ethereum-cryptography/random.js";

// AES encryption
import { encrypt } from "ethereum-cryptography/aes.js";

// secp256k1 elliptic curve operations
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";

// BIP32 HD Keygen, BIP39 Mnemonic Phrases
import { HDKey } from "ethereum-cryptography/hdkey.js";
import { generateMnemonic as gm1 } from "ethereum-cryptography/bip39.js";
import { generateMnemonic as gm2 } from "ethereum-cryptography/bip39/index.js";
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english.js";

// utilities
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

import * as w1 from 'ethereum-cryptography/bip39/wordlists/czech.js';
import * as w2 from 'ethereum-cryptography/bip39/wordlists/english.js';
import * as w3 from 'ethereum-cryptography/bip39/wordlists/french.js';
import * as w4 from 'ethereum-cryptography/bip39/wordlists/italian.js';
import * as w5 from 'ethereum-cryptography/bip39/wordlists/japanese.js';
import * as w6 from 'ethereum-cryptography/bip39/wordlists/korean.js';
import * as w7 from 'ethereum-cryptography/bip39/wordlists/simplified-chinese.js';
import * as w8 from 'ethereum-cryptography/bip39/wordlists/spanish.js';
import * as w9 from 'ethereum-cryptography/bip39/wordlists/traditional-chinese.js';
