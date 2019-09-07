# ethereum-cryptography

[![npm version][1]][2]
[![Travis CI][3]][4]
[![license][5]][6]
[![Types][7]][8]

⚠️ **WARNING: This projects is under active development. Don't use it until a stable version is released.** ⚠️

This npm package contains all the cryptographic primitives normally used when 
developing Javascript/TypeScript applications and tools for Ethereum.

Pure Javascript implementations of all the primitives are included, so it can
be used out of the box for web applications and libraries. In Node, it takes
advantage of the built-in implementations when possible. To improve performance
in Node, you can install a
[second package](https://www.npmjs.com/package/ethereum-cryptography-native)
with native implemantations that will be detected and used by this one.

The cryptographic primitives included are:

* `keccak`
* `scrypt`
* `pbkdf2`
* `sha256`
* `ripemd160`
* `secp256k1`

## Installation

Via `npm`:

```bash
$ npm install ethereum-cryptography
```

Via `yarn`:

```bash
$ yarn add ethereum-cryptography
```

## Usage

There's a submodule available for each cryprographic primitive. 

No `index.js`/`main` is provided, as that would lead to huge bundles when using 
this package for the web.

## keccak submodule

The `keccack` submodule has four functions that receive a `Buffer` with the 
message to hash, and return a `Buffer` with the hash. These are `keccak224`, 
`keccak256`, `keccak384`, and `keccak512`.

### Function types

```ts
function keccak224(msg: Buffer): Buffer;

function keccak256(msg: Buffer): Buffer;

function keccak384(msg: Buffer): Buffer;

function keccak512(msg: Buffer): Buffer;
```

### Example usage

```js
const { keccak256 } = require("ethereum-cryptography/keccak");

console.log(keccak256(Buffer.from("Hello, world!", "ascii")).toString("hex"));
```

## scrypt submodule

The `scrypt` submodule has two functions implementing the `scrypt` key
derivation algorithm in synchronous and asynchronous ways. This algorithm is
very slow, and using the synchronous version in the browser is not recommended,
as it will block its main thread and hang your ui.

### Password encoding

Encoding passwords is a frequent source of errors. Please read 
[these notes](https://github.com/ricmoo/scrypt-js/tree/0eb70873ddf3d24e34b53e0d9a99a0cef06a79c0#encoding-notes) 
before using this submodule.

### Function types

```ts
function scrypt(password: Buffer, salt: Buffer, n: number, p: number, r: number, dklen: number): Promise<Buffer>;

function scryptSync(password: Buffer, salt: Buffer, n: number, p: number, r: number, dklen: number): Buffer;
```

### Example usage

```js
const { scryptSync } = require("ethereum-cryptography/scrypt");

console.log(
  scryptSync(
    Buffer.from("ascii password", "ascii"),
    Buffer.from("salt", "hex"),
    16,
    1,
    1,
    64
  ).toString("hex")
);
```

## pbkdf2 submodule

The `pbkdf2` submodule has two functions implementing the `pbkdf2` key
derivation algorithm in synchronous and asynchronous ways.

### Password encoding

Encoding passwords is a frequent source of errors. Please read
[these notes](https://github.com/ricmoo/scrypt-js/tree/0eb70873ddf3d24e34b53e0d9a99a0cef06a79c0#encoding-notes)
before using this submodule.

### Supported digets

In Node this submodule uses the native implementation, and supports any digest
returned by [`crypto.getHashes`](https://nodejs.org/api/crypto.html#crypto_crypto_gethashes).

In the browser, it is tested to support at least `sha256`, the only digest
normally used with `pbkdf2` in Ethereum. It may support more.

### Function types

```ts
function pbkdf2(password: Buffer, salt: Buffer, iterations: number, keylen: number, digest: string): Promise<Buffer>;

function pbkdf2Sync(password: Buffer, salt: Buffer, iterations: number, keylen: number, digest: string): Buffer;
```

### Example usage

```js
const { pbkdf2Sync } = require("ethereum-cryptography/pbkdf2");

console.log(
  pbkdf2Sync(
    Buffer.from("ascii password", "ascii"),
    Buffer.from("salt", "hex"),
    4096,
    32,
    'sha256'
  ).toString("hex")
);
```

## sha256 submodule

The `sha256` submodule contains a single functions implementing the `sha256`
hash algorithm.

### Function types

```ts
function sha256(msg: Buffer): Buffer;
```

### Example usage

```js
const { sha256 } = require("ethereum-cryptography/sha256");

console.log(sha256(Buffer.from("message", "ascii")).toString("hex"));
```

## ripemd160 submodule

The `ripemd160` submodule contains a single functions implementing the
`ripemd160` hash algorithm.

### Function types

```ts
function ripemd160(msg: Buffer): Buffer;
```

### Example usage

```js
const { ripemd160 } = require("ethereum-cryptography/ripemd160");

console.log(ripemd160(Buffer.from("message", "ascii")).toString("hex"));
```

## secp256k1 submodule

The `secp256k1` submodule has the same API than the native module 
[`secp256k1` from cryptocoinjs](https://github.com/cryptocoinjs/secp256k1-node) 
version `3.x`, but it's backed by [`elliptic`](https://www.npmjs.com/package/elliptic).

### Function types

Consult [`secp256k1`'s documentation](https://github.com/cryptocoinjs/secp256k1-node).

### Example usage

```js
const { sign } = require("ethereum-cryptography/secp256k1");

const msgHash = Buffer.from(
  "82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28",
  "hex"
);

const privateKey = Buffer.from(
  "3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1",
  "hex"
);

console.log(sign(msgHash, privateKey).toString("hex"));
```

## Browser usage

This package works with all the major Javascript bundlers. It is
tested with `webpack`, `Rollup`, `Parcel`, and `Browserify`.

For using it with `Rollup` you need to use these plugins:
[`rollup-plugin-node-builtins`](https://www.npmjs.com/package/rollup-plugin-node-builtins),
[`rollup-plugin-node-globals`](https://www.npmjs.com/package/rollup-plugin-node-globals), 
and [`rollup-plugin-json`](https://www.npmjs.com/package/rollup-plugin-json).

## Opt-in native implementations (Node.js only)

If you are using this package in Node, you can install
[`ethereum-cryptography-native`](https://www.npmjs.com/package/ethereum-cryptography-native)
to opt-in to use native implementations of some of the cryptographic primitives
provided by this package.

No extra work is needed for this to work. This package will detect that 
`ethereum-cryptography-native` is installed, and use it.

While installing `ethereum-cryptography-native` will generally improve the 
performance of your application, we recommend leaving the decision of installing 
it to your users. It has multiple native dependencies that need to be compiled,
and this can be problematic in some environments.

## License

`ethereum-cryptography` is released under [the MIT License](./LICENSE).

[1]: https://img.shields.io/npm/v/ethereum-cryptography.svg
[2]: https://www.npmjs.com/package/ethereum-cryptography
[3]: https://img.shields.io/travis/alcuadrado/ethereum-cryptography/master.svg?label=Travis%20CI
[4]: https://travis-ci.org/alcuadrado/ethereum-cryptography
[5]: https://img.shields.io/npm/l/ethereum-cryptography
[6]: https://github.com/alcuadrado/ethereum-cryptography/blob/master/packages/ethereum-cryptography/LICENSE
[7]: https://img.shields.io/npm/types/ethereum-cryptography.svg
[8]: https://www.npmjs.com/package/ethereum-cryptography
