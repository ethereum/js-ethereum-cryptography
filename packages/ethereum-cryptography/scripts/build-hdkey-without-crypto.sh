set -e

echo "Bundling hdkey with Rollup"
npx rollup -c hdkey-without-crypto-config/rollup.config.js

echo "Copying output"
cp hdkey-without-crypto-build/hdkey-without-crypto.js ./src/vendor
cp hdkey-without-crypto-build/hdkey-without-crypto.js ./src/pure/vendor
