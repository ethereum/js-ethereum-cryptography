import { it } from "micro-should";

import * as aes from './aes';
import * as ase from './assert';
import * as bip from './bip39';
import * as b2b from './blake2b';
import * as hdk from './hdkey';
import * as kec from './keccak';
import * as pbk from './pbkdf2';
import * as rand from './random';
import * as md160 from './ripemd160';
import * as scr from './scrypt';
import * as cpt from './secp256k1-compat';
import * as k1 from './secp256k1';
import * as sha256 from './sha256';
import * as sha512 from './sha512';

// typescript
[aes, ase, bip, b2b, hdk, kec, pbk, rand, md160, scr, cpt, k1, sha256, sha512];

it.run();
