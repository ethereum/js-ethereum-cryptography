// buf.toString('hex') -> toHex(buf)
import { assertBytes } from "@noble/hashes/utils";
export {
  assertBool,
  assertBytes,
  bytesToHex,
  bytesToHex as toHex,
  concatBytes,
  hexToBytes,
  createView,
  utf8ToBytes
} from "@noble/hashes/utils";

// buf.toString('utf8') -> bytesToUtf8(buf)
export function bytesToUtf8(data: Uint8Array): string {
  if (!(data instanceof Uint8Array)) {
    throw new TypeError(`bytesToUtf8 expected Uint8Array, got ${typeof data}`);
  }
  return new TextDecoder().decode(data);
}

// buf.equals(buf2) -> equalsBytes(buf, buf2)
export function equalsBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// Internal utils
export function wrapHash(hash: (msg: Uint8Array) => Uint8Array) {
  return (msg: Uint8Array) => {
    assertBytes(msg);
    return hash(msg);
  };
}

export const crypto: { node?: any; web?: Crypto } = (() => {
  const webCrypto =
    typeof self === "object" && "crypto" in self ? self.crypto : undefined;
  const nodeRequire =
    typeof module !== "undefined" &&
    typeof module.require === "function" &&
    module.require.bind(module);
  return {
    node: nodeRequire && !webCrypto ? nodeRequire("crypto") : undefined,
    web: webCrypto
  };
})();
