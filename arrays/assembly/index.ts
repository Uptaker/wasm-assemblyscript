// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}


export function sum(arr: i32[]): i32 {
  return arr.reduce<i32>((a, b) => a + b, 0)
}

export function sumBigInt(arr: i64[]): i64 {
  return arr.reduce<i64>((a, b) => a + b, 0)
}
