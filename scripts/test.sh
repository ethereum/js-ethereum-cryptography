set -e

cd packages/ethereum-cryptography
npm run test
npm run browser-tests

cd ../ethereum-cryptography-native 
npm run test
