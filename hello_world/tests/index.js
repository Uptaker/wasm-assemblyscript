import assert from "assert";
import { add, hello } from "../build/debug.js";
assert.strictEqual(add(1, 2), 3);
assert.strictEqual(hello(), "Hello World!");
console.log(hello())
console.log("ok");
