# scryptsy-without-crypto

This folder contains the necessary config to bundle `scryptsy` with Rollup, but
without including the `crypto` built-in module nor `crypto-browserify`.

## Why do we do this?

`crypto-browserify` is a very large bundle that doesn't work well with some
bundlers (e.g. Rollup).

It also has uses `async`/`await` which isn't supported by default on Parcel.

## How does this work?

We have a git submodule with the latests release of `scryptsy`, and bundle it 
with Rollup.

We replace the imports of `crypto` for `./pbkdf2`. We do this in two steps.
First we alias `crypto` to `<this-dir>/crypto-shim.js`, which just imports 
`./pbkdf2`. This is done in this way because aliases are always resolved
after Rollup's commonjs plugin's ignore logic.

Finally, we run the bundled version though `tsc`, which compiles down the 
`async`/`await` to ES5.
