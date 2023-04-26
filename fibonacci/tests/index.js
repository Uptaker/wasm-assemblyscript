import assert from "assert";
import { add, fibonacci } from "../build/debug.js";
assert.strictEqual(add(1, 2), 3);
assert.strictEqual(fibonacci(15n), BigInt(610));
console.log("ok");
