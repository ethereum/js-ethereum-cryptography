set -e

echo "Building tests with TypeScript"
npx tsc --project tsconfig.json

echo "Building elliptic shim"
npm run elliptic-secp256k1:build
mkdir -p test-builds/tsc/src/vendor
cp src/vendor/elliptic-secp256k1.js test-builds/tsc/src/vendor

echo "Building scryptsy-without-crypto"
npm run scryptsy-without-crypto:build
mkdir -p test-builds/tsc/src/vendor test-builds/tsc/src/pure/vendor
cp src/vendor/scryptsy-without-crypto.js test-builds/tsc/src/vendor
cp src/pure/vendor/scryptsy-without-crypto.js test-builds/tsc/src/pure/vendor

echo "Building hdkey-without-crypto"
npm run hdkey-without-crypto:build
mkdir -p test-builds/tsc/src/vendor test-builds/tsc/src/pure/vendor
cp src/vendor/hdkey-without-crypto.js test-builds/tsc/src/vendor
cp src/pure/vendor/hdkey-without-crypto.js test-builds/tsc/src/pure/vendor

echo "Building bip39-without-wordlists"
npm run bip39-without-wordlists:build
mkdir -p test-builds/tsc/src/pure/vendor
cp src/pure/vendor/bip39-without-wordlists.js test-builds/tsc/src/pure/vendor

echo "Building tests with Parcel"
npx parcel build --no-cache --no-minify test-builds/tsc/src/pure/*.js test-builds/tsc/test/pure/*.js -d test-builds/parcel

echo "Building tests with Browserify"
npx browserify test-builds/tsc/src/pure/*.js test-builds/tsc/test/pure/*.js > test-builds/browserify-build.js

echo "Building tests with webpack"
npx webpack --mode development test-builds/tsc/src/pure/*.js test-builds/tsc/test/pure/*.js --output test-builds/webpack-build.js

echo "Building tests with Rollup"
rollup -c test/rollup.config.js
