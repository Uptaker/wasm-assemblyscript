// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function fibonacci(n: i64): i64 {
  if (n === 0) return 0
  else if (n === 1) return 1
  let a = 0
  let b = 1
  for (let i = 2; i <= n; i++) {
      const c = a + b
      a = b
      b = c
  }
  return <i64>b
}
