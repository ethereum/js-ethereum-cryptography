# ethereum-cryptography-native

[![npm version][1]][2]
[![Travis CI][3]][4]
[![license][5]][6]

This is a companion package of `ethereum-cryptography`. Installing this package 
makes `ethereum-cryptography` use native implementations of these cryptographic 
primitives:

* `keccak`
* `scrypt`
* `secp256k1`

## Installation

Via `npm`:

```bash
$ npm install ethereum-cryptography-native
```

Via `yarn`:

```bash
$ yarn add ethereum-cryptography-native
```

## Usage

This package isn't meant to be used directly. Use `ethereum-cryptography` 
instead.

To use this package in conjunction with `ethereum-cryptography` you just need to
install it.

While this package will generally improve the performance of your application, 
we recommend leaving the decision of installing it to your users. It has 
multiple native dependencies that need to be compiled, and this can be 
problematic in some environments.

[1]: https://img.shields.io/npm/v/ethereum-cryptography-native.svg
[2]: https://www.npmjs.com/package/ethereum-cryptography-native
[3]: https://img.shields.io/travis/alcuadrado/ethereum-cryptography/master.svg?label=Travis%20CI
[4]: https://travis-ci.org/alcuadrado/ethereum-cryptography
[5]: https://img.shields.io/npm/l/ethereum-cryptography-native
[6]: https://github.com/alcuadrado/ethereum-cryptography/blob/master/packages/ethereum-cryptography-native/LICENSE
