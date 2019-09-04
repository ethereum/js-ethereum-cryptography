# ethereum-cryptography

[![npm version][1]][2]
[![Travis CI][3]][4]
[![license][5]][6]

This npm package contains all the cryptographic primitives normally used when 
developing Javascript/TypeScript applications and tools for Ethereum.

This package contains pure-js implementations of these primitives:

* `keccak`

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

No `index.js` is provided, as that would lead to huge bundles when using this 
package for the web.

### keccak

The `keccack` submodule has four functions that receive a `Buffer` with the 
message to hash, and return a `Buffer` with the hash. These are `keccak224`, 
`keccak256`, `keccak384`, and `keccak512`.

#### Example usage

```js
const { keccak256 } = require("ethereum-cryptography/keccak");

console.log(keccak256(Buffer.from("Hello, world!", "ascii")).toString("hex"));
```

## Browser usage

This package works out of the box with all the major Javascript bundlers (e.g. 
`webpack`, `Rollup`, `Parcel`, `Browserify`). 

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
