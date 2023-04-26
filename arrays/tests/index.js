import assert from "assert";
import { add, square, sum, sumBigInt, max, average } from "../build/debug.js";
assert.strictEqual(add(1, 2), 3);

// Sum
assert.strictEqual(sum([1, 5, 0, 10]), 16);
assert.strictEqual(sumBigInt([1, 5, 0, 10].map(v => BigInt(v))), BigInt(16));

// Square
assert.deepStrictEqual(square([1, 5, 10, 100]), [1, 25, 100, 10000]);

// Max
assert.strictEqual(max([1, 5, 0, 10, 6]), 10);

// Average
assert.strictEqual(average([1, 5, 0, 10, 4]), 4);

console.log("ok");
