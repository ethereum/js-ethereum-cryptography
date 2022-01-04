import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";
import { utils as _utils } from "@noble/secp256k1";
export {
  getPublicKey,
  sign,
  signSync,
  verify,
  getSharedSecret,
  utils,
  Point,
  Signature,
  CURVE,
  schnorr
} from "@noble/secp256k1";

// Enable sync API for noble-secp256k1
_utils.hmacSha256Sync = (key: Uint8Array, ...messages: Uint8Array[]) => {
  const h = hmac.create(sha256, key);
  messages.forEach(msg => h.update(msg));
  return h.digest();
};
