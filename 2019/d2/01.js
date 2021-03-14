const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split(',').map(Number)
  return arr
}

function main() {
  let arr = getInput('./input.txt')
  let res = solution(arr)
  console.log(res)
}


main()


/**
 * ======================================
 * 
 *  SOLUTION
 * 
 * ======================================
 */

function solution(arr) {
  arr[1] = 12
  arr[2] = 2
  let i= 0
  while(arr[i] != 99 && i < arr.length) {
    let ch = arr[i]
    if(ch == 1) {
      let a = arr[i+1], b = arr[i+2], c = arr[i+3]
      arr[c] = arr[a] + arr[b]
      i+=3
      continue
    } 
    if(ch == 2) {
      let a = arr[i+1], b = arr[i+2], c = arr[i+3]
      arr[c] = arr[a]*arr[b]
      i+=3
      continue
    }
    i++
  }
  return arr[0]
}