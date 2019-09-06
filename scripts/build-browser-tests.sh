set -e

echo "Building tests with TypeScript"
npx tsc --project tsconfig.json

echo "Building tests with Parcel"
npx parcel build --no-cache --no-minify test-builds/tsc/src/pure/*.js test-builds/tsc/test/pure/*.js -d test-builds/parcel

echo "Building tests with Browserify"
npx browserify test-builds/tsc/src/pure/*.js test-builds/tsc/test/pure/*.js > test-builds/browserify-build.js

echo "Building tests with webpack"
npx webpack --mode development test-builds/tsc/src/pure/*.js test-builds/tsc/test/pure/*.js --output test-builds/webpack-build.js

echo "Building tests with Rollup"
rollup -c test/rollup.config.js
