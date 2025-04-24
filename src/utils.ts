import { abool as assertBool } from "@noble/curves/abstract/utils";
import { abytes as assertBytes } from "@noble/hashes/_assert";
import { hexToBytes as _hexToBytes } from "@noble/hashes/utils";

export {
  bytesToHex,
  concatBytes,
  createView,
  bytesToHex as toHex,
  utf8ToBytes
} from "@noble/hashes/utils";
export { assertBool, assertBytes };

// buf.toString('hex') -> toHex(buf)

// Global symbols in both browsers and Node.js since v11
// See https://github.com/microsoft/TypeScript/issues/31535
declare const TextEncoder: any;
declare const TextDecoder: any;

// buf.toString('utf8') -> bytesToUtf8(buf)
export function bytesToUtf8(data: Uint8Array): string {
  if (!(data instanceof Uint8Array)) {
    throw new TypeError(`bytesToUtf8 expected Uint8Array, got ${typeof data}`);
  }
  return new TextDecoder().decode(data);
}

export function hexToBytes(data: string): Uint8Array {
  const sliced = data.startsWith("0x") ? data.substring(2) : data;
  return _hexToBytes(sliced);
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
  return (msg: Uint8Array): Uint8Array => {
    assertBytes(msg);
    return hash(msg);
  };
}
