# hdkey-without-crypto

This folder contains the necessary config to bundle `hdkey` with Rollup, but
without including the `crypto` built-in module nor `crypto-browserify`, and
using our local version of `secp256k1` instead of the native version.

## Why do we do this?

`crypto-browserify` is a very large bundle that doesn't work well with some
bundlers (e.g. Rollup).

Also, `hdkey` depends on `secp256k1`, so installing it will compile a native
dependency.

## How does this work?

We have a git submodule with the latests release of `hdkey`, and bundle it
with Rollup.

We replace the imports of `crypto` for `./shims/crypto`. We do this in two
steps. First we alias `crypto` to `<this-dir>/crypto-shim.js`, which just
imports `./shims/crypt`. This is done in this way because aliases are always
resolved after Rollup's commonjs plugin's ignore logic.

We also replace the imports of `secp256k1` for `./secp256k1` using the same
technique.
