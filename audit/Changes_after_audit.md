# Changes implemented in response to the audit

This documents contains a list of the changes that have been implemented as a result of [the audit report](./Trail_of_Bits_audit_report.pdf).

## TOB-NOMIC-001: AES modes of operation

### Changes
* Set aes-ctr-128 as default operation mode and recommend using that.
* Update readme to mention that only aes-128-ctr, aes-128-cbc, and aes-256-cbc are supported.
* Print a warning if an unsupported mode is used.
* Recommend using aes-128-cbc and aes-256-cbc only to decrypt already encrypted data.
* Add an explanation about IVs having to be unique, and instructing the users to use the random module to get them.
* Add a warning about error messages and recommend using generic errors messages if the encryption/decryption fails.

### Commits
* deb0844ae816d241c1c5930b13e3ea0b84eab933


## TOB-NOMIC-002: secp256k1 interface for key generation

### Changes
* Added two functions to the module to create private keys. These use the random module get random values and use secp256k1's private key validation function.

### Commits
* 56c9edf58b123f2d4c62d625980abcc558770c8e


## TOB-NOMIC-003: Strong types for security

No action was taken yet. This change requires more discussion with potential consumers of the library.


## TOB-NOMIC-004: Duplicated code

### Changes
* Removal of duplicated code in aes, random, pbkdf2 and hashing modules.

### Commits
* 03f8b75cd40d106847a53834531ee7c85894b5f6
* 8c669d6ac0d759289de9be96dbd9c456ccbeb0cc
* fb998dec7cb1ade2de8079fe8db115f3cf15fdcf
* 434478c611f052b3d8201a34d100ae79bb2fcca3
* 6c27cc4404c0975401dd97140eb03cde83b29db9
* 373fcb331e361bf78de4574a33e5b316ec4f95d4


## TOB-NOMIC-005: Dependency management

### Changes
* Updated secp256k1 to v4.
* Replace js-sha3 with keccack v3.
* Run npm audit and fixed all non-dev-dependencies warnings.

## Commits
* 063ba25c152abbb5005150ac9aad4b828245560d
* b6e244093fc1ddcf0c2f1874509c0ad3f302d67b
* 9a097accb1c5d1fed8eaa9ae60db3bc19b7faede
* 373fcb331e361bf78de4574a33e5b316ec4f95d4


## TOB-NOMIC-006: Submodule management

### Changes
* Update hdkey submodule.
* Update bip39 submodule.
* Replace scriptsy with scrypt-js and remove its submodule.
* Remove secp256k1 submodule, as secp256k1 v4 uses N-API and already meets the goals of this project.

### Commits
* a1402f9701eb4b324e5940b06f80d35eb8ce1b9e
* d5d4859257ebf3be0c0dcbef24e05647b28ca02b
* 3cfa5516fba6b850461f2d3c8a1ff66550461012
* b6e244093fc1ddcf0c2f1874509c0ad3f302d67b
* 9a097accb1c5d1fed8eaa9ae60db3bc19b7faede

## OTHER CHANGES: Remove ethreum-cryptography-native package

By updating kecack and secp256k1 to their N-API versions, there were little performance gains to obtain by using the native version of the package. We removed it to simplify the project.

### Commits
* d5d4859257ebf3be0c0dcbef24e05647b28ca02b
* 05576f9a349352178c37cc0cc458766887bd2b9e
