// buf.toString('hex') -> toHex(buf)
import { assertBytes } from "@noble/hashes/utils";
export {
  assertBytes,
  bytesToHex as toHex,
  createView
} from "@noble/hashes/utils";
// Buffer.from(hex, 'hex') -> hexToBytes(hex)
export function hexToBytes(hex: string): Uint8Array {
  if (typeof hex !== "string") {
    throw new TypeError(`hexToBytes: expected string, got ${typeof hex}`);
  }
  if (hex.length % 2) {
    throw new Error("hexToBytes: received invalid unpadded hex");
  }
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    array[i] = Number.parseInt(hex.slice(j, j + 2), 16);
  }
  return array;
}
// Buffer.from(s, 'utf8') -> utf8ToBytes(s)
export function utf8ToBytes(s: string) {
  if (typeof s !== "string") {
    throw new TypeError(`utf8ToBytes expected string, got ${typeof s}`);
  }
  return new TextEncoder().encode(s);
}
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
// Buffer.concat([buf1, buf2]) -> concatBytes(buf1, buf2)
export function concatBytes(...arrays: Uint8Array[]): Uint8Array {
  if (arrays.length === 1) {
    return arrays[0];
  }
  const length = arrays.reduce((a, arr) => a + arr.length, 0);
  const result = new Uint8Array(length);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const arr = arrays[i];
    result.set(arr, pad);
    pad += arr.length;
  }
  return result;
}
// Internal utils
export function assertBool(b: boolean) {
  if (typeof b !== "boolean") {
    throw new Error(`Expected boolean, not ${b}`);
  }
}

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
