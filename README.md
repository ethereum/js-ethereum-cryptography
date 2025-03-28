# ethereum-cryptography

[Audited](#security) pure JS library containing all Ethereum-related cryptographic primitives. Implemented with 6 [noble & scure](https://paulmillr.com/noble/) dependencies.

Check out [Changelog / Upgrading](#upgrading) and an article about the library:
[A safer, smaller, and faster Ethereum cryptography stack](https://medium.com/nomic-labs-blog/a-safer-smaller-and-faster-ethereum-cryptography-stack-5eeb47f62d79).

## Usage

```shell
npm install ethereum-cryptography
```

We explicitly support major browsers and Node.js on x86 and arm64. Other major runtimes and platforms are supported on a best-effort basis.
Refer to `engines` field of `package.json` for runtime support information for each version.
Tests are being ran with Webpack, Rollup, Parcel and Browserify.

This package has no single entry-point, but submodule for each cryptographic
primitive. The reason for this is that importing everything from a single file will lead to huge bundles when using this package for the web. This could be
avoided through tree-shaking, but the possibility of it not working properly
on one of [the supported bundlers](#browser-usage) is too high.

- [Usage](#usage)
  - [Dependencies](#dependencies)
  - [hashes: sha256, sha512, keccak, ripemd160, blake2b](#hashes-sha256-sha512-keccak-ripemd160-blake2b)
  - [kdfs: pbkdf2, scrypt](#kdfs-pbkdf2-scrypt)
  - [random: secure randomness](#random-secure-randomness)
  - [secp256k1: curve operations](#secp256k1-curve-operations)
  - [bn: pairing-friendly curve](#bn-pairing-friendly-curve)
  - [bls: pairing-friendly curve](#bls-pairing-friendly-curve)
  - [aes: encryption](#aes-encryption)
  - [hdkey: bip32 HD wallets](#hdkey-bip32-hd-wallets)
  - [bip39: mnemonic phrases](#bip39-mnemonic-phrases)
  - [math: utilities](#math-utilities)
  - [utils: generic utilities](#utils-generic-utilities)
  - [secp256k1-compat: compatibility layer with other libraries](#secp256k1-compat-compatibility-layer-with-other-libraries)
  - [All imports](#all-imports)
- [Caveats](#caveats)
  - [Browser usage: Rollup setup](#browser-usage-rollup-setup)
  - [AES](#aes)
    - [Encrypting with passwords](#encrypting-with-passwords)
    - [Operation modes](#operation-modes)
    - [Padding plaintext messages](#padding-plaintext-messages)
    - [How to use the IV parameter](#how-to-use-the-iv-parameter)
    - [How to handle errors with this module](#how-to-handle-errors-with-this-module)
- [Upgrading](#upgrading)
  - [Changelog](#changelog)
  - [From v2 to v3](#from-v2-to-v3)
  - [From v1 to v2](#from-v1-to-v2)
  - [From v0.1 to v1](#from-v01-to-v1)
- [Security](#security)
- [License](#license)

### Dependencies

All functionality of the module is simple
re-export of 6 audited [noble & scure libraries](https://paulmillr.com/noble/):

- noble-curves, noble-ciphers, noble-hashes
- scure-base, scure-bip32, scure-bip39

ethereum-cryptography pins versions of the libraries to ensure good
protection against supply chain attacks. Ideally, your app would also
pin version of ethereum-cryptography. That means, no `^3.1.0` - use `3.1.0` instead.

### hashes: sha256, sha512, keccak, ripemd160, blake2b

```js
import { sha256 } from "ethereum-cryptography/sha256.js";
import { sha512 } from "ethereum-cryptography/sha512.js";
import {
  keccak256,
  keccak224,
  keccak384,
  keccak512,
} from "ethereum-cryptography/keccak.js";
import { ripemd160 } from "ethereum-cryptography/ripemd160.js";
import { blake2b } from "ethereum-cryptography/blake2b.js";
sha256(Uint8Array.from([1, 2, 3])); // A: buffers

import { utf8ToBytes } from "ethereum-cryptography/utils.js";
sha256(utf8ToBytes("abc")); // B: strings

import { bytesToHex as toHex } from "ethereum-cryptography/utils.js";
toHex(sha256(utf8ToBytes("abc"))); // C: hex
```

### kdfs: pbkdf2, scrypt

```js
import { pbkdf2, pbkdf2Sync } from "ethereum-cryptography/pbkdf2.js";
import { scrypt, scryptSync } from "ethereum-cryptography/scrypt.js";
import { utf8ToBytes } from "ethereum-cryptography/utils.js";

// Pass Uint8Array, or convert strings to Uint8Array
const pass = utf8ToBytes("password");
const salt = utf8ToBytes("salt");
const iters = 131072;
const outLength = 32;
console.log(await pbkdf2(pass, salt, iters, outLength, "sha256"));

const N = 262144;
const r = 8;
const p = 1;
const outLengths = 32;
console.log(await scrypt(pass, salt, N, r, p, outLengths));
```

The `pbkdf2` submodule has two functions implementing the PBKDF2 key
derivation algorithm in synchronous and asynchronous ways. This algorithm is
very slow, and using the synchronous version in the browser is not recommended,
as it will block its main thread and hang your UI. The KDF supports `sha256` and `sha512` digests.

The `scrypt` submodule has two functions implementing the Scrypt key
derivation algorithm in synchronous and asynchronous ways. This algorithm is
very slow, and using the synchronous version in the browser is not recommended,
as it will block its main thread and hang your UI.

Encoding passwords is a frequent source of errors. Please read
[notes](https://github.com/ricmoo/scrypt-js/tree/0eb70873ddf3d24e34b53e0d9a99a0cef06a79c0#encoding-notes)
before using these submodules.

### random: secure randomness

```js
import { getRandomBytesSync } from "ethereum-cryptography/random.js";
console.log(getRandomBytesSync(32));
```

The `random` submodule has functions to generate cryptographically strong
pseudo-random data in synchronous and asynchronous ways. Backed by [`crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) in browser and by [`crypto.randomBytes`](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) in node.js. If backends are somehow not available, the module would throw an error and won't work, as keeping them working would be insecure.

### secp256k1: curve operations

```js
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
// You pass either a hex string, or Uint8Array
const privateKey =
  "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
const messageHash =
  "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
const publicKey = secp256k1.getPublicKey(privateKey);
const signature = secp256k1.sign(messageHash, privateKey);
const isSigned = secp256k1.verify(signature, messageHash, publicKey);
```

Elliptic curve operations on the curve secp256k1. Check out [noble-curves docs](https://github.com/paulmillr/noble-curves) for more info.

secp256k1 private keys need to be cryptographically secure random numbers with
certain characteristics. If this is not the case, the security of secp256k1 is
compromised.

### bn: pairing-friendly curve

```js
import { bn } from "ethereum-cryptography/bls.js";

console.log(bn254.G1, bn254.G2, bn254.pairing);
```

For example usage, check out [the implementation of bn254 EVM precompiles](https://github.com/paulmillr/noble-curves/blob/3ed792f8ad9932765b84d1064afea8663a255457/test/bn254.test.js#L697).

### bls: pairing-friendly curve

```js
import { bls12_381 as bls } from "ethereum-cryptography/bls.js";

// G1 keys, G2 signatures
const privateKey =
  "67d53f170b908cabb9eb326c3c337762d59289a8fec79f7bc9254b584b73265c";
const message = "64726e3da8";
const publicKey = bls.getPublicKey(privateKey);
const signature = bls.sign(message, privateKey);
const isValid = bls.verify(signature, message, publicKey);
console.log({ publicKey, signature, isValid });

// G2 signatures, G1 keys
// getPublicKeyForShortSignatures(privateKey)
// signShortSignature(message, privateKey)
// verifyShortSignature(signature, message, publicKey)
// aggregateShortSignatures(signatures)

// Custom DST
const htfEthereum = { DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_POP_" };
const signatureEth = bls.sign(message, privateKey, htfEthereum);
const isValidEth = bls.verify(signature, message, publicKey, htfEthereum);

// Aggregation
const aggregatedKey = bls.aggregatePublicKeys([
  bls.getPublicKey(bls.utils.randomPrivateKey()),
  bls.getPublicKey(bls.utils.randomPrivateKey()),
]);
// const aggregatedSig = bls.aggregateSignatures(sigs)

// Pairings, with and without final exponentiation
// bls.pairing(PointG1, PointG2);
// bls.pairing(PointG1, PointG2, false);
// bls.fields.Fp12.finalExponentiate(bls.fields.Fp12.mul(PointG1, PointG2));

// Others
// bls.G1.ProjectivePoint.BASE, bls.G2.ProjectivePoint.BASE;
// bls.fields.Fp, bls.fields.Fp2, bls.fields.Fp12, bls.fields.Fr;
```

For example usage, check out [the implementation of BLS EVM precompiles](https://github.com/ethereumjs/ethereumjs-monorepo/blob/361f4edbc239e795a411ac2da7e5567298b9e7e5/packages/evm/src/precompiles/bls12_381/noble.ts).

### aes: encryption

```js
import * as aes from "ethereum-cryptography/aes.js";
import { hexToBytes, utf8ToBytes } from "ethereum-cryptography/utils.js";

console.log(
  aes.encrypt(
    utf8ToBytes("message"),
    hexToBytes("2b7e151628aed2a6abf7158809cf4f3c"),
    hexToBytes("f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff")
  )
);
// const mode = "aes-128-ctr"; // "aes-128-cbc", "aes-256-ctr", "aes-256-cbc"
// function encrypt(msg: Uint8Array, key: Uint8Array, iv: Uint8Array, mode = "aes-128-ctr", pkcs7PaddingEnabled = true): Uint8Array;
// function decrypt(cipherText: Uint8Array, key: Uint8Array, iv: Uint8Array, mode = "aes-128-ctr", pkcs7PaddingEnabled = true): Uint8Array;
```

### hdkey: bip32 HD wallets

```js
import { HDKey } from "ethereum-cryptography/hdkey.js";
const hdkey1 = HDKey.fromMasterSeed(seed);
const hdkey2 = HDKey.fromExtendedKey(base58key);
const hdkey3 = HDKey.fromJSON({ xpriv: string });

// props
[hdkey1.depth, hdkey1.index, hdkey1.chainCode];
console.log(hdkey2.privateKey, hdkey2.publicKey);
console.log(hdkey3.derive("m/0/2147483647'/1"));
const sig = hdkey3.sign(hash);
hdkey3.verify(hash, sig);
```

Hierarchical deterministic (HD) wallets that conform to
[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).

### bip39: mnemonic phrases

```js
import * as bip39 from "ethereum-cryptography/bip39/index.js";
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english.js";

// import { wordlist } from "ethereum-cryptography/bip39/wordlists/czech.js";
// import { wordlist } from "ethereum-cryptography/bip39/wordlists/english.js";
// import { wordlist } from "ethereum-cryptography/bip39/wordlists/french.js";
// import { wordlist } from "ethereum-cryptography/bip39/wordlists/italian.js";
// import { wordlist } from "ethereum-cryptography/bip39/wordlists/japanese.js";
// import { wordlist } from "ethereum-cryptography/bip39/wordlists/korean.js";
// import { wordlist } from "ethereum-cryptography/bip39/wordlists/portuguese.js";
// import { wordlist } from "ethereum-cryptography/bip39/wordlists/simplified-chinese.js";
// import { wordlist } from "ethereum-cryptography/bip39/wordlists/spanish.js";
// import { wordlist } from "ethereum-cryptography/bip39/wordlists/traditional-chinese.js";

// Generate x random words. Uses Cryptographically-Secure Random Number Generator.
const mn = bip39.generateMnemonic(wordlist);
console.log(mn);

// Reversible: Converts mnemonic string to raw entropy in form of byte array.
const ent = bip39.mnemonicToEntropy(mn, wordlist);

// Reversible: Converts raw entropy in form of byte array to mnemonic string.
bip39.entropyToMnemonic(ent, wordlist);

// Validates mnemonic for being 12-24 words contained in `wordlist`.
bip39.validateMnemonic(mn, wordlist);

// Irreversible: Uses KDF to derive 64 bytes of key data from mnemonic + optional password.
await bip39.mnemonicToSeed(mn, "password");
bip39.mnemonicToSeedSync(mn, "password");
```

The `bip39` submodule provides functions to generate, validate and use seed
recovery phrases according to [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

Wordlists for different languages are not imported by default,
as that would increase bundle sizes too much. Instead, you should import and use them explicitly.

### math: utilities

```js
import { modPow, modInvert } from "ethereum-cryptography/math.js";
modPow(123n, 456n, 789n);
modInvert(22n, 5n);
```

### utils: generic utilities

```js
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
```

### secp256k1-compat: compatibility layer with other libraries

```js
import {
  createPrivateKeySync,
  ecdsaSign,
} from "ethereum-cryptography/secp256k1-compat";
const msgHash = Uint8Array.from(
  "82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28",
  "hex"
);
const privateKey = createPrivateKeySync();
console.log(Uint8Array.from(ecdsaSign(msgHash, privateKey).signature));
```

**Warning:** use `secp256k1` instead. This module is only for users who upgraded
from ethereum-cryptography v0.1. It could be removed in the future.

The API of `secp256k1-compat` is the same as [secp256k1-node](https://github.com/cryptocoinjs/secp256k1-node):

### All imports

```js
import { sha256 } from "ethereum-cryptography/sha256.js";
import { sha512 } from "ethereum-cryptography/sha512.js";
import {
  keccak256,
  keccak224,
  keccak384,
  keccak512,
} from "ethereum-cryptography/keccak.js";
import { ripemd160 } from "ethereum-cryptography/ripemd160.js";
import { blake2b } from "ethereum-cryptography/blake2b.js";

import { pbkdf2Sync } from "ethereum-cryptography/pbkdf2.js";
import { scryptSync } from "ethereum-cryptography/scrypt.js";

import { getRandomBytesSync } from "ethereum-cryptography/random.js";

import { encrypt } from "ethereum-cryptography/aes.js";
import { modPow, modInvert } from "ethereum-cryptography/math.js";

import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { bls12_381 } from "ethereum-cryptography/bls.js";
import { bn254 } from "ethereum-cryptography/bn.js";

import { HDKey } from "ethereum-cryptography/hdkey.js";
import { generateMnemonic } from "ethereum-cryptography/bip39/index.js";
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english.js";

import { modPow, modInvert } from "ethereum-cryptography/math.js";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
```

## Caveats

### Browser usage: Rollup setup

Using this library with Rollup requires the following plugins:

- [`@rollup/plugin-commonjs`](https://www.npmjs.com/package/@rollup/plugin-commonjs)
- [`@rollup/plugin-node-resolve`](https://www.npmjs.com/package/@rollup/plugin-node-resolve)

These can be used by setting your `plugins` array like this:

```js
plugins: [
  commonjs(),
  resolve({
    browser: true,
    preferBuiltins: false,
  }),
];
```

### AES

#### Encrypting with passwords

AES is not supposed to be used directly with a password. Doing that will
compromise your users' security.

The `key` parameters in this submodule are meant to be strong cryptographic
keys. If you want to obtain such a key from a password, please use a
[key derivation function](https://en.wikipedia.org/wiki/Key_derivation_function)
like [pbkdf2](#kdfs-pbkdf2-scrypt) or [scrypt](#kdfs-pbkdf2-scrypt).

#### Operation modes

This submodule works with different [block cipher modes of operation](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation). If you are using this module in a new
application, we recommend using the default.

While this module may work with any mode supported by OpenSSL, we only test it
with `aes-128-ctr`, `aes-128-cbc`, and `aes-256-cbc`. If you use another module
a warning will be printed in the console.

We only recommend using `aes-128-cbc` and `aes-256-cbc` to decrypt already
encrypted data.

#### Padding plaintext messages

Some operation modes require the plaintext message to be a multiple of `16`. If
that isn't the case, your message has to be padded.

By default, this module automatically pads your messages according to [PKCS#7](https://tools.ietf.org/html/rfc2315).
Note that this padding scheme always adds at least 1 byte of padding. If you
are unsure what anything of this means, we **strongly** recommend you to use
the defaults.

If you need to encrypt without padding or want to use another padding scheme,
you can disable PKCS#7 padding by passing `false` as the last argument and
handling padding yourself. Note that if you do this and your operation mode
requires padding, `encrypt` will throw if your plaintext message isn't a
multiple of `16`.

This option is only present to enable the decryption of already encrypted data.
To encrypt new data, we recommend using the default.

#### How to use the IV parameter

The `iv` parameter of the `encrypt` function must be unique, or the security
of the encryption algorithm can be compromised.

You can generate a new `iv` using the `random` module.

Note that to decrypt a value, you have to provide the same `iv` used to encrypt
it.

#### How to handle errors with this module

Sensitive information can be leaked via error messages when using this module.
To avoid this, you should make sure that the errors you return don't
contain the exact reason for the error. Instead, errors must report general
encryption/decryption failures.

Note that implementing this can mean catching all errors that can be thrown
when calling on of this module's functions, and just throwing a new generic
exception.

## Upgrading

### Changelog

- v3.0 (Sep 2024): new modules `bls`, `bn`, `math`
  change async AES to non-native sync,
  improve typescript compatibility, new dependency [noble-ciphers](https://github.com/paulmillr/noble-ciphers)
- v2.0 (Apr 2023): switched
  [noble-secp256k1](https://github.com/paulmillr/noble-secp256k1) to
  [noble-curves](https://github.com/paulmillr/noble-curves),
  which changes re-exported api of `secp256k1` submodule.
- v1.0 (Jan 2022): rewritten the library from
  scratch and [audited](#security) it. It became **6x smaller:** ~5,000 lines of
  code instead of ~24,000 (with all deps); 650KB instead of 10.2MB.
  5 dependencies by 1 author are now used, instead of 38 by 5 authors.

### From v2 to v3

1. utils: `crypto` var had been removed
2. aes: async methods became sync

### From v1 to v2

1. `secp256k1` module was changed massively:
   before, it was using [noble-secp256k1 1.7](https://github.com/paulmillr/noble-secp256k1);
   now it uses safer [noble-curves](https://github.com/paulmillr/noble-curves). Please refer
   to [upgrading section from curves README](https://github.com/paulmillr/noble-curves#upgrading).
   Main changes to keep in mind: a) `sign` now returns `Signature` instance
   b) `recoverPublicKey` got moved onto a `Signature` instance
2. node.js 14 and older support was dropped. Upgrade to node.js 16 or later.

### From v0.1 to v1

All old APIs remain the same except for the breaking changes:

1. We return `Uint8Array` from all methods that worked with `Buffer` before.
   `Buffer` has never been supported in browsers, while `Uint8Array`s are supported natively in both
   browsers and node.js.
2. We target runtimes with [bigint](https://caniuse.com/bigint) support,
   which is Chrome 67+, Edge 79+, Firefox 68+, Safari 14+, node.js 10+. If you need to support older runtimes, use `ethereum-cryptography@0.1`
3. If you've used `secp256k1`, [rename it to `secp256k1-compat`](#legacy-secp256k1-compatibility-layer)

```js
import { sha256 } from "ethereum-cryptography/sha256.js";

// Old usage
const hasho = sha256(Buffer.from("string", "utf8")).toString("hex");

// New usage
import { toHex } from "ethereum-cryptography/utils.js";
const hashn = toHex(sha256("string"));

// If you have `Buffer` module and want to preserve it:
const hashb = Buffer.from(sha256("string"));
const hashbo = hashb.toString("hex");
```

## Security

Audited by Cure53 on Jan 5, 2022. Check out the audit [PDF](./audit/2022-01-05-cure53-audit-nbl2.pdf) & [URL](https://cure53.de/pentest-report_hashing-libs.pdf).

Dependencies are having separate regular audits: check out their documentation for more info.

## License

`ethereum-cryptography` is released under The MIT License (MIT)

Copyright (c) 2021 Patricio Palladino, Paul Miller, ethereum-cryptography contributors

See [LICENSE](./LICENSE) file.

`hdkey` is loosely based on [hdkey](https://github.com/cryptocoinjs/hdkey),
which had [MIT License](https://github.com/cryptocoinjs/hdkey/blob/3f3c0b5cedb98f971835b5116ebea05b3c09422a/LICENSE)

Copyright (c) 2018 cryptocoinjs

[1]: https://www.npmjs.com/package/ethereum-cryptography
[2]: https://github.com/ethereum/js-ethereum-cryptography/blob/master/packages/ethereum-cryptography/LICENSE
