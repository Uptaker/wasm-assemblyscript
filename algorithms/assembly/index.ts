// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function bubblesort(origArr: i32[]): i32[] {
  let arr = origArr;
  for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < (arr.length - i -1); j++) {
          if(arr[j] > arr[j + 1]){
              let temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
          }
      }
  }
  return arr;
}

export function sieveOfEratosthenes(limit: i32): i32[] {
  let primes: i32[] = new Array<i32>();

  let isPrime: bool[] = new Array<bool>(limit + 1);
  for (let i = 0; i < isPrime.length; i++) {
    isPrime[i] = true;
  }

  for (let p = 2; p * p <= limit; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= limit; i += p) {
        isPrime[i] = false;
      }
    }
  }

  for (let p = 2; p <= limit; p++) {
    if (isPrime[p]) primes.push(p);
  }

  return primes;
}

export function monteCarloPi(times: i32): f64 {
  let inside: i32 = 0;
  for (let i: i32 = 0; i < times; i++) {
    const x: f64 = Math.random();
    const y: f64 = Math.random();
    if (x * x + y * y <= 1) inside++;
  }
  return 4 * inside / times;
}

export function djb2Hash(str: string): u32 {
  let hash: u32 = 5381;
  for (let i: i32 = 0; i < str.length; i++) hash = ((hash << 5) + hash) + <u32>str.charCodeAt(i);
  return hash;
}


// Ackermann algorithm implementations. Scrapped due to stack range errors/crashes

// export function ackermann(m: i32, n: i32): i32 {
//   if (m == 0) {
//     return n + 1;
//   } else if (n == 0) {
//     return ackermann(m - 1, 1);
//   } else {
//     return ackermann(m - 1, ackermann(m, n - 1));
//   }
// }

// RangeError -> the previous ackermann function exceeded the stack limit, so this one is iterative instead of recursive

// export function ackermannIterative(m: i32, n: i32): i32 {
//   let stack = new Array<i32>();
//   let result = 0;
//   stack.push(m);
//   while (stack.length > 0) {
//     let x = stack.pop();
//     if (x === 0) {
//       result = n + 1;
//       if (stack.length > 0) {
//         n = stack.pop();
//         stack.push(--n);
//       }
//     } else if (n === 0) {
//       n = 1;
//       stack.push(--x);
//     } else {
//       stack.push(--x);
//       stack.push(++x);
//       stack.push(--n);
//     }
//   }
//   return result;
// }

// unfortunately, iterative approach simply crashes the page.