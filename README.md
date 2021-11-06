# ethereum-cryptography

[![npm version][1]][2] [![Travis CI][3]][4] [![license][5]][6] [![Types][7]][8]

This package contains all pure-js cryptographic primitives normally used when
developing Javascript / TypeScript applications and tools for Ethereum.

The cryptographic primitives included are:

* [Hashes: SHA256, keccak-256, RIPEMD160, BLAKE2b](#hashes-sha256-keccak-256-ripemd160-blake2b)
* [KDFs: PBKDF2, Scrypt](#kdfs-pbkdf2-scrypt)
* [CSPRNG (Cryptographically strong pseudorandom number generator)](#csprng-cryptographically-strong-pseudorandom-number-generator)
* [secp256k1 curve](#secp256k1-curve)
* [BIP32 HD Keygen](#bip32-hd-keygen)
* [BIP39 Mnemonic phrases](#bip39-mnemonic-phrases)
* [AES Encryption](#aes-encryption)

**October 2021 update:** We're releasing **experimental** version 0.2 of the package.
The module has been completely rewritten:

- ~6x smaller: 4,000 lines of code instead of 22,438 (with all deps); 185KB instead of 755KB
- 3 dependencies (pending an audit) instead of 38
- **Same functionality**, all old APIs remain the same except for two breaking changes:
    1. We return `Uint8Array` from all methods that worked with `Buffer` before.
  `Buffer` has never been supported in browsers, while `Uint8Array`s are supported natively in both
  browsers and node.js. See [Upgrading](#upgrading)
    2. We target runtimes with [bigint](https://caniuse.com/bigint) support,
  which is Chrome 67+, Edge 79+, Firefox 68+, Safari 14+, node.js 10+. If you need to support older runtimes, use `ethereum-cryptography@0.1`
    3. If you've used `secp256k1`, [rename it to `secp256k1-compat`](#legacy-secp256k1-compatibility-layer)
- The new module [has not been audited yet](#security), but it's in the process of getting the audit. Use it at your own risk

## Usage

Use NPM / Yarn in node.js / browser:

```bash
# NPM
npm install ethereum-cryptography@next

# Yarn
yarn add ethereum-cryptography@next
```

See [browser usage](#browser-usage) for information on using the package with major Javascript bundlers. It is
tested with **Webpack, Rollup, Parcel and Browserify**.

This package has no single entry-point, but submodule for each cryptographic
primitive. Read each primitive's section of this document to learn how to use
them.

The reason for this is that importing everything from a single file will lead to
huge bundles when using this package for the web. This could be avoided through
tree-shaking, but the possibility of it not working properly on one of
[the supported bundlers](#browser-usage) is too high.

```js
// Hashes
const { sha256 } = require("ethereum-cryptography/sha256");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { ripemd160 } = require("ethereum-cryptography/ripemd160");
const { blake2b } = require("ethereum-cryptography/blake2b");

// KDFs
const { pbkdf2Sync } = require("ethereum-cryptography/pbkdf2");
const { scryptSync } = require("ethereum-cryptography/scrypt");

// Random
const { getRandomBytesSync } = require("ethereum-cryptography/random");

// AES encryption
const { encrypt } = require("ethereum-cryptography/aes");

// secp256k1 elliptic curve operations
const { createPrivateKeySync, ecdsaSign } = require("ethereum-cryptography/secp256k1");

// BIP32 HD Keygen, BIP39 Mnemonic Phrases
const { HDKey } = require("ethereum-cryptography/hdkey");
const { generateMnemonic } = require("ethereum-cryptography/bip39");
const { wordlist } = require("ethereum-cryptography/bip39/wordlists/english");

// utilities
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
```

## Hashes: SHA256, keccak-256, RIPEMD160, BLAKE2b
```typescript
function sha256(msg: Uint8Array): Uint8Array;
function sha512(msg: Uint8Array): Uint8Array;
function keccak256(msg: Uint8Array): Uint8Array;
function ripemd160(msg: Uint8Array): Uint8Array;
function blake2b(msg: Uint8Array, outputLength = 64): Uint8Array;
```

Exposes following cryptographic hash functions:

- SHA2 (SHA256, SHA512)
- keccak-256 variant of SHA3 (also `keccak224`, `keccak384`,
and `keccak512`)
- RIPEMD160
- BLAKE2b

```js
const { sha256 } = require("ethereum-cryptography/sha256");
const { sha512 } = require("ethereum-cryptography/sha512");
const { keccak256, keccak224, keccak384, keccak512 } = require("ethereum-cryptography/keccak");
const { ripemd160 } = require("ethereum-cryptography/ripemd160");
const { blake2b } = require("ethereum-cryptography/blake2b");

sha256(Uint8Array.from([1, 2, 3]))

// Can be used with strings
const { utf8ToBytes } = require("ethereum-cryptography/utils");
sha256(utf8ToBytes("abc"))

// If you need hex
const { toHex } = require("ethereum-cryptography/utils");
toHex(sha256(utf8ToBytes("abc")))
```

## KDFs: PBKDF2, Scrypt

```ts
function pbkdf2(password: Uint8Array, salt: Uint8Array, iterations: number, keylen: number, digest: string): Promise<Uint8Array>;
function pbkdf2Sync(password: Uint8Array, salt: Uint8Array, iterations: number, keylen: number, digest: string): Uint8Array;
function scrypt(password: Uint8Array, salt: Uint8Array, N: number, p: number, r: number, dkLen: number): Promise<Uint8Array>;
function scryptSync(password: Uint8Array, salt: Uint8Array, N: number, p: number, r: number, dkLen: number): Uint8Array;
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
[these notes](https://github.com/ricmoo/scrypt-js/tree/0eb70873ddf3d24e34b53e0d9a99a0cef06a79c0#encoding-notes)
before using these submodules.

```js
const { pbkdf2 } = require("ethereum-cryptography/pbkdf2");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
// Pass Uint8Array, or convert strings to Uint8Array
console.log(await pbkdf2(utf8ToBytes("password"), utf8ToBytes("salt"), 131072, 32, "sha256"));
```

```js
const { scryptSync } = require("ethereum-cryptography/scrypt");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
console.log(await scrypt(utf8ToBytes("password"), utf8ToBytes("salt"), 262144, 8, 1, 32));
```

## CSPRNG (Cryptographically strong pseudorandom number generator)

```ts
function getRandomBytes(bytes: number): Promise<Uint8Array>;
function getRandomBytesSync(bytes: number): Uint8Array;
```

The `random` submodule has functions to generate cryptographically strong
pseudo-random data in synchronous and asynchronous ways.

Backed by [`crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) in browser and by [`crypto.randomBytes`](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) in node.js. If backends are somehow not available, the module would throw an error and won't work, as keeping them working would be insecure.

```js
const { getRandomBytesSync } = require("ethereum-cryptography/random");
console.log(getRandomBytesSync(32));
```

## secp256k1 curve

```ts
function getPublicKey(privateKey: Uint8Array, isCompressed?: false): Uint8Array;
function getSharedSecret(privateKeyA: Uint8Array, publicKeyB: Uint8Array): Uint8Array;
function sign(msgHash: Uint8Array, privateKey: Uint8Array, opts?: Options): Promise<Uint8Array>;
function signSync(msgHash: Uint8Array, privateKey: Uint8Array, opts?: Options): Uint8Array;
function verify(signature: Uint8Array, msgHash: Uint8Array, publicKey: Uint8Array): boolean
function recoverPublicKey(msgHash: Uint8Array, signature: Uint8Array, recovery: number): Uint8Array | undefined;
function utils.randomPrivateKey(): Uint8Array;
```

The `secp256k1` submodule provides a library for elliptic curve operations on
the curve secp256k1. For detailed documentation, follow [README of `noble-secp256k1`](https://github.com/paulmillr/noble-secp256k1), which the module uses as a backend.

secp256k1 private keys need to be cryptographically secure random numbers with
certain caracteristics. If this is not the case, the security of secp256k1 is
compromised. We strongly recommend using `utils.randomPrivateKey()` to generate them.

```js
const secp = require("ethereum-cryptography/secp256k1");
(async () => {
  // You pass either a hex string, or Uint8Array
  const privateKey = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
  const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
  const publicKey = secp.getPublicKey(privateKey);
  const signature = await secp.sign(messageHash, privateKey);
  const isSigned = secp.verify(signature, messageHash, publicKey);
})();
```

Note: if you've been using ethereum-cryptography v0.1, it had different API. We're providing a compatibility layer for users who want to upgrade without hassle. Check out [the legacy documentation](#legacy-secp256k1-compatibility-layer).

## BIP32 HD Keygen

This module exports a single class whose type is

```ts
class HDKey {
  public static HARDENED_OFFSET: number;
  public static fromMasterSeed(seed: Uint8Array, versions: Versions): HDKey;
  public static fromExtendedKey(base58key: string, versions: Versions): HDKey;
  public static fromJSON(json: { xpriv: string }): HDKey;

  public versions: Versions;
  public depth: number;
  public index: number;
  public chainCode: Uint8Array | null;
  public privateKey: Uint8Array | null;
  public publicKey: Uint8Array | null;
  public fingerprint: number;
  public parentFingerprint: number;
  public pubKeyHash: Uint8Array | undefined;
  public identifier: Uint8Array | undefined;
  public privateExtendedKey: string;
  public publicExtendedKey: string;

  private constructor(versios: Versions);
  public derive(path: string): HDKey;
  public deriveChild(index: number): HDKey;
  public sign(hash: Uint8Array): Uint8Array;
  public verify(hash: Uint8Array, signature: Uint8Array): boolean;
  public wipePrivateData(): this;
  public toJSON(): { xpriv: string; xpub: string };
}

interface Versions {
  private: number;
  public: number;
}
```

The `hdkey` submodule provides a library for keys derivation according to
[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).

It has almost the exact same API than the version `1.x` of
[`hdkey` from cryptocoinjs](https://github.com/cryptocoinjs/hdkey),
but it's backed by this package's primitives, and has built-in TypeScript types.
Its only difference is that it has to be be used with a named import.
The implementation is [loosely based on hdkey, which has MIT License](#LICENSE).

```js
const { HDKey } = require("ethereum-cryptography/hdkey");
const { hexToBytes } = require("ethereum-cryptography/utils");

const seed = "fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542";
const hdkey = HDKey.fromMasterSeed(hexToBytes(seed));
const childkey = hdkey.derive("m/0/2147483647'/1");

console.log(childkey.privateExtendedKey);
```

## BIP39 Mnemonic Seed Phrase

```ts
function generateMnemonic(wordlist: string[], strength: number = 128): string;
function mnemonicToEntropy(mnemonic: string, wordlist: string[]): Uint8Array;
function entropyToMnemonic(entropy: Uint8Array, wordlist: string[]): string;
function validateMnemonic(mnemonic: string, wordlist: string[]): boolean;
async function mnemonicToSeed(mnemonic: string, passphrase: string = ""): Promise<Uint8Array>;
function mnemonicToSeedSync(mnemonic: string, passphrase: string = ""): Uint8Array;
```

The `bip39` submodule provides functions to generate, validate and use seed
recovery phrases according to [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

```js
const { generateMnemonic } = require("ethereum-cryptography/bip39");
const { wordlist } = require("ethereum-cryptography/bip39/wordlists/english");
console.log(generateMnemonic(wordlist));
```

This submodule also contains the word lists defined by BIP39 for Czech, English,
French, Italian, Japanese, Korean, Simplified and Traditional Chinese, and
Spanish. These are not imported by default, as that would increase bundle sizes
too much. Instead, you should import and use them explicitly.

The word lists are exported as a `wordlist` variable in each of these submodules:

* `ethereum-cryptography/bip39/wordlists/czech.js`
* `ethereum-cryptography/bip39/wordlists/english.js`
* `ethereum-cryptography/bip39/wordlists/french.js`
* `ethereum-cryptography/bip39/wordlists/italian.js`
* `ethereum-cryptography/bip39/wordlists/japanese.js`
* `ethereum-cryptography/bip39/wordlists/korean.js`
* `ethereum-cryptography/bip39/wordlists/simplified-chinese.js`
* `ethereum-cryptography/bip39/wordlists/spanish.js`
* `ethereum-cryptography/bip39/wordlists/traditional-chinese.js`

## AES Encryption

```ts
function encrypt(msg: Uint8Array, key: Uint8Array, iv: Uint8Array, mode = "aes-128-ctr", pkcs7PaddingEnabled = true): Promise<Uint8Array>;
function decrypt(cypherText: Uint8Array, key: Uint8Array, iv: Uint8Array, mode = "aes-128-ctr", pkcs7PaddingEnabled = true): Promise<Uint8Array>;
```

The `aes` submodule contains encryption and decryption functions implementing
the [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
algorithm.

### Encrypting with passwords

AES is not supposed to be used directly with a password. Doing that will
compromise your users' security.

The `key` parameters in this submodule are meant to be strong cryptographic
keys. If you want to obtain such a key from a password, please use a
[key derivation function](https://en.wikipedia.org/wiki/Key_derivation_function)
like [pbkdf2](#pbkdf2-submodule) or [scrypt](#scrypt-submodule).

### Operation modes

This submodule works with different [block cipher modes of operation](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation). If you are using this module in a new
application, we recommend using the default.

While this module may work with any mode supported by OpenSSL, we only test it
with `aes-128-ctr`, `aes-128-cbc`, and `aes-256-cbc`. If you use another module
a warning will be printed in the console.

We only recommend using `aes-128-cbc` and `aes-256-cbc` to decrypt already
encrypted data.

### Padding plaintext messages

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

### How to use the IV parameter

The `iv` parameter of the `encrypt` function must be unique, or the security
of the encryption algorithm can be compromissed.

You can generate a new `iv` using the `random` module.

Note that to decrypt a value, you have to provide the same `iv` used to encrypt
it.

### How to handle errors with this module

Sensitive information can be leaked via error messages when using this module.
To avoid this, you should make sure that the errors you return don't
contain the exact reason for the error. Instead, errors must report general
encryption/decryption failures.

Note that implementing this can mean catching all errors that can be thrown
when calling on of this module's functions, and just throwing a new generic
exception.

### Example usage

```js
const { encrypt } = require("ethereum-cryptography/aes");
const { hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");

console.log(
  encrypt(
    utf8ToBytes("message"),
    hexToBytes("2b7e151628aed2a6abf7158809cf4f3c"),
    hexToBytes("f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff")
  )
);
```

## Browser usage

### Rollup setup

Using this library with Rollup requires the following plugins:

* [`@rollup/plugin-commonjs`](https://www.npmjs.com/package/@rollup/plugin-commonjs)
* [`@rollup/plugin-node-resolve`](https://www.npmjs.com/package/@rollup/plugin-node-resolve)

These can be used by setting your `plugins` array like this:

```js
  plugins: [
    commonjs(),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
  ]
```

## Legacy secp256k1 compatibility layer

**Note:** consider using `secp256k1` instead;
This module is only for users who upgraded
from ethereum-cryptography v0.1. It could be removed in the future,
but we're keeping it around for now, for backwards-compatibility.

The API of `secp256k1-compat` is the same as [secp256k1-node](https://github.com/cryptocoinjs/secp256k1-node):

```js
const { createPrivateKeySync, ecdsaSign } = require("ethereum-cryptography/secp256k1-compat");
const msgHash = Uint8Array.from(
  "82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28",
  "hex"
);
const privateKey = createPrivateKeySync();
console.log(Uint8Array.from(ecdsaSign(msgHash, privateKey).signature));
```

## Missing cryptographic primitives

This package intentionally excludes the the cryptographic primitives necessary
to implement the following EIPs:

* [EIP 196: Precompiled contracts for addition and scalar multiplication on the elliptic curve alt_bn128](https://eips.ethereum.org/EIPS/eip-196)
* [EIP 197: Precompiled contracts for optimal ate pairing check on the elliptic curve alt_bn128](https://eips.ethereum.org/EIPS/eip-197)
* [EIP 198: Big integer modular exponentiation](https://eips.ethereum.org/EIPS/eip-198)
* [EIP 152: Add Blake2 compression function `F` precompile](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-152.md)

Feel free to open an issue if you want this decision to be reconsidered, or if
you found another primitive that is missing.

## Upgrading

Version 0.2 changes from 0.1:

- **Breaking:** we target runtimes with [bigint](https://caniuse.com/bigint) support,
  which is Chrome 67+, Edge 79+, Firefox 68+, Safari 14+, node.js 10+. If you need to support
  older runtimes, use `ethereum-cryptography@0.1`
- **Breaking:** we return `Uint8Array` from all methods that worked with `Buffer` before.
  `Buffer` has never been supported in browsers, while `Uint8Array`s are supported natively in both
  browsers and node.js:

```
const { sha256 } = require("ethereum-cryptography/sha256");

// Old usage
const hasho = sha256(Buffer.from("string", "utf8")).toString("hex");

// New usage
const { toHex } = require("ethereum-cryptography/utils");
const hashn = toHex(sha256("string"));

// If you have `Buffer` module and want to preserve it:
const hashb = Buffer.from(sha256("string"));
const hashbo = hashb.toString("hex");
```

## Security

This library is in the process of getting a security audit.

## License

`ethereum-cryptography` is released under The MIT License (MIT)

Copyright (c) 2021 Patricio Palladino, Paul Miller, ethereum-cryptography contributors

See [LICENSE](./LICENSE) file.

`hdkey` is loosely based on [hdkey](https://github.com/cryptocoinjs/hdkey),
which had [MIT License](https://github.com/cryptocoinjs/hdkey/blob/3f3c0b5cedb98f971835b5116ebea05b3c09422a/LICENSE)

Copyright (c) 2018 cryptocoinjs

[1]: https://img.shields.io/npm/v/ethereum-cryptography.svg
[2]: https://www.npmjs.com/package/ethereum-cryptography
[3]: https://img.shields.io/travis/ethereum/js-ethereum-cryptography/master.svg?label=Travis%20CI
[4]: https://travis-ci.org/ethereum/js-ethereum-cryptography
[5]: https://img.shields.io/npm/l/ethereum-cryptography
[6]: https://github.com/ethereum/js-ethereum-cryptography/blob/master/packages/ethereum-cryptography/LICENSE
[7]: https://img.shields.io/npm/types/ethereum-cryptography.svg
[8]: https://www.npmjs.com/package/ethereum-cryptography
