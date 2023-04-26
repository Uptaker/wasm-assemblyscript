// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function bubblesort(origArr: i32[]): i32[] {
  let arr = origArr;
  for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < ( arr.length - i -1 ); j++) {
          if(arr[j] > arr[j+1]){
              let temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j+1] = temp;
          }
      }
  }
  return arr;
}

export function sieveOfEratosthenes(n: i32): i32[] {
  let primes: i32[] = new Array<i32>();

  let isPrime: bool[] = new Array<bool>(n + 1);
  for (let i = 0; i < isPrime.length; i++) {
    isPrime[i] = true;
  }

  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= n; i += p) {
        isPrime[i] = false;
      }
    }
  }

  for (let p = 2; p <= n; p++) {
    if (isPrime[p]) {
      primes.push(p);
    }
  }

  return primes;
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