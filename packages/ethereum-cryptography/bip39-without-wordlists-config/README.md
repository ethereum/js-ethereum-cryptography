# hdkey-without-crypto

This folder contains the necessary config to bundle `bip39` with Rollup, but
without including its wordlits.

## Why do we do this?

Including its wordlists would make this module huge.

## How does this work?

We have a git submodule with the latests release of `bip39`, and bundle it
with Rollup.

We replace the imports of `./_wordlists` with an empty module.

