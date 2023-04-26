import assert from "assert";
import { add, sum, sumBigInt } from "../build/debug.js";
assert.strictEqual(add(1, 2), 3);

// Sum
assert.strictEqual(sum([1, 5, 0, 10]), 16);
assert.strictEqual(sumBigInt([1, 5, 0, 10].map(v => BigInt(v))), BigInt(16));


console.log("ok");
