
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
  .map(val => parseInt(val, 10))
  return arr
}

function main() {
  let input = getInput('./input.txt')
  let res = solution(input)
  console.log('============= THE ANSWER IS =============')
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
  arr.sort((a,b) => a-b)
  console.log(arr)
  let n = 0, res = [0, 0, 0]
  for(let i=0; i<arr.length; i++) {
    if(arr[i] - n <= 3) {
      if(n+1 == arr[i]) {
        res[0]++
      } else if(n+2 == arr[i]) {
        res[1]++
      } else if(n+3 == arr[i]) {
        console.log(arr[i])
        res[2]++
      }
      n = arr[i]
    } 
  }
  console.log(res)
  return (res[2]+1) * res[0]
}


