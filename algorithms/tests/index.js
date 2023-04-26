import assert from "assert";
import { add, bubblesort } from "../build/debug.js";
assert.strictEqual(add(1, 2), 3);
assert.deepStrictEqual(bubblesort([5, 4, 6, 1, 3, 2]), [1, 2, 3, 4, 5, 6]);
console.log("ok");
