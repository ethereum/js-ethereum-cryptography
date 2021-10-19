// Minimal assert version to avoid dependecies on node internals
// Allows to verify that none of brwoserify version of node internals is included in resulting build
async function deepStrictEqual(
  actual: unknown,
  expected: unknown,
  message?: string
) {
  const [actualType, expectedType] = [typeof actual, typeof expected];
  const err = new Error(
    `Non-equal values: actual=${actual} (type=${actualType}) expected=${expected} (type=${expectedType})${
      message ? `. Message: ${message}` : ""
    }`
  );
  if (actualType !== expectedType) {
    throw err;
  }
  // Primitive types
  if (
    ["string", "number", "bigint", "undefined", "boolean"].includes(actualType)
  ) {
    if (actual !== expected) {
      throw err;
    }
    return;
  }
  if (actual instanceof Uint8Array && expected instanceof Uint8Array) {
    if (actual.length !== expected.length) {
      throw err;
    }
    for (let i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) {
        throw err;
      }
    }
    return;
  }
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) {
      throw err;
    }
    for (let i = 0; i < actual.length; i++) {
      deepStrictEqual(actual[i], expected[i], message);
    }
    return;
  }
  if (actual === null && expected === null) {
    return;
  }
  if (actualType === "object") {
    const [actualKeys, expectedKeys] = [
      Object.keys(actual as object),
      Object.keys(expected as object)
    ];
    deepStrictEqual(actualKeys, expectedKeys, message);
    for (const key of actualKeys) {
      deepStrictEqual((actual as any)[key], (expected as any)[key], message);
    }
    return;
  }
  throw err;
}

async function throws(cb: () => any) {
  try {
    cb();
  } catch (e) {
    return;
  }
  throw new Error("Missing expected exception.");
}

async function rejects(cb: () => Promise<any>): Promise<void> {
  try {
    await cb();
  } catch (e) {
    return;
  }
  throw new Error("Missing expected rejection.");
}

// Run tests with node assert:
// import { deepStrictEqual, throws } from "assert";

export { deepStrictEqual, throws, rejects };
