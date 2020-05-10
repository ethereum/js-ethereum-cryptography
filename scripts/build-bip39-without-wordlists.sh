set -e

echo "Bundling bip39 with Rollup"
npx rollup -c bip39-without-wordlists-config/rollup.config.js

echo "Copying output"
cp bip39-without-wordlists-build/bip39-without-wordlists.js ./src/vendor
