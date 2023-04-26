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
