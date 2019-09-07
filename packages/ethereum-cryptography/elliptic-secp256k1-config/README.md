# elliptic-secp256k1

This folder contains the necessary config to bundle `secp256k1`'s `elliptic` 
wrapper with Rollup.

## Why do we do this?

We need to unify `secp256k1` and `elliptic`'s APIs. `secp256k1` already did 
this, but we can't install it as a dependency because it compiles a native 
library.

Instead, we have a git submodule with `secp256k1`'s latest version and use
Rollup to bundle just the necessary parts of it.
