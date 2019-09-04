set -e

cd packages/ethereum-cryptography
npm run lint

cd ../ethereum-cryptography-native 
npm run lint
