# ethereum-cryptography

[![npm version][1]][2]
[![Travis CI][3]][4]
[![license][5]][6]

This npm package contains all the cryptographic primitives normally used when 
developing Javascript/TypeScript applications and tools for Ethereum.

This package contains pure-js implementations of these primitives:

* `keccak`
* `scrypt`

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

### keccak submodule

The `keccack` submodule has four functions that receive a `Buffer` with the 
message to hash, and return a `Buffer` with the hash. These are `keccak224`, 
`keccak256`, `keccak384`, and `keccak512`.

#### Function types

```ts
function keccak224(msg: Buffer): Buffer;

function keccak256(msg: Buffer): Buffer;

function keccak384(msg: Buffer): Buffer;

function keccak512(msg: Buffer): Buffer;
```

#### Example usage

```js
const { keccak256 } = require("ethereum-cryptography/keccak");

console.log(keccak256(Buffer.from("Hello, world!", "ascii")).toString("hex"));
```

### scrypt submodule

The `scrypt` submodule has two functions implementing the `scrypt` hash 
algorithm in synchronous and asynchronous ways. This algorithm is very slow,
and using the synchronous version in the browser is not recommended, as it will
block its main thread and hang your ui.

#### Password encoding

Encoding passwords is a frequent source of errors. Please read 
[these notes](https://github.com/ricmoo/scrypt-js/tree/0eb70873ddf3d24e34b53e0d9a99a0cef06a79c0#encoding-notes) 
before using this submodule.

#### Function types

```ts
function scrypt(password: Buffer, salt: Buffer, n: number, p: number, r: number, dklen: number): Buffer;

function scryptAsync(password: Buffer, salt: Buffer, n: number, p: number, r: number, dklen: number): Promise<Buffer>;
```

#### Example usage

```js
const { scrypt } = require("ethereum-cryptography/scrypt");

console.log(
  scrypt(
    Buffer.from("ascii password", "ascii"),
    Buffer.from("AAAA", "hex"),
    16,
    1,
    1,
    64
  ).toString("hex")
);
```

### sha256 submodule

The `sha256` submodule contains a single functions implementing the `sha256`
hash algorithm.

#### Function types

```ts
function sha256(msg: Buffer): Buffer;
```

#### Example usage

```js
const { sha256 } = require("ethereum-cryptography/sha256");

console.log(sha256(Buffer.from("message", "ascii")).toString("hex"));
```

### ripemd160 submodule

The `ripemd160` submodule contains a single functions implementing the
`ripemd160` hash algorithm.

#### Function types

```ts
function ripemd160(msg: Buffer): Buffer;
```

#### Example usage

```js
const { ripemd160 } = require("ethereum-cryptography/ripemd160");

console.log(ripemd160(Buffer.from("message", "ascii")).toString("hex"));
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
`ethereum-cryptography-native` to opt-in to use native implementations of some
of the cryptographic primitives provided by this package. 

No extra work is needed for this to work. This package will detect that 
`ethereum-cryptography-native` is installed, and use it.

While installing `ethereum-cryptography-native` will generally improve the 
performance of your application, we recommend leaving the decision of installing 
it to your users. It has multiple native dependencies that need to be compiled,
and this can be problematic in some environments.


[1]: https://img.shields.io/npm/v/ethereum-cryptography.svg
[2]: https://www.npmjs.com/package/ethereum-cryptography
[3]: https://img.shields.io/travis/alcuadrado/ethereum-cryptography/master.svg?label=Travis%20CI
[4]: https://travis-ci.org/alcuadrado/ethereum-cryptography
[5]: https://img.shields.io/npm/l/ethereum-cryptography
[6]: https://github.com/alcuadrado/ethereum-cryptography/blob/master/packages/ethereum-cryptography/LICENSE
