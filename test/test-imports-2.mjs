// Hashes
import { sha256 } from "ethereum-cryptography/sha256";
import { keccak256 } from "ethereum-cryptography/keccak";
import { ripemd160 } from "ethereum-cryptography/ripemd160";
import { blake2b } from "ethereum-cryptography/blake2b";

// KDFs
import { pbkdf2Sync } from "ethereum-cryptography/pbkdf2";
import { scryptSync } from "ethereum-cryptography/scrypt";

// Random
import { getRandomBytesSync } from "ethereum-cryptography/random";

// AES encryption
import { encrypt } from "ethereum-cryptography/aes";

// secp256k1 elliptic curve operations
import { secp256k1 } from "ethereum-cryptography/secp256k1";

// BIP32 HD Keygen, BIP39 Mnemonic Phrases
import { HDKey } from "ethereum-cryptography/hdkey";
import { generateMnemonic as gm1 } from "ethereum-cryptography/bip39";
import { generateMnemonic as gm2 } from "ethereum-cryptography/bip39/index";
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english";

// utilities
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils";

import * as w1 from 'ethereum-cryptography/bip39/wordlists/czech';
import * as w2 from 'ethereum-cryptography/bip39/wordlists/english';
import * as w3 from 'ethereum-cryptography/bip39/wordlists/french';
import * as w4 from 'ethereum-cryptography/bip39/wordlists/italian';
import * as w5 from 'ethereum-cryptography/bip39/wordlists/japanese';
import * as w6 from 'ethereum-cryptography/bip39/wordlists/korean';
import * as w7 from 'ethereum-cryptography/bip39/wordlists/simplified-chinese';
import * as w8 from 'ethereum-cryptography/bip39/wordlists/spanish';
import * as w9 from 'ethereum-cryptography/bip39/wordlists/traditional-chinese';
