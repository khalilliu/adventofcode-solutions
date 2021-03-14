const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n').map(Number)
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
  return arr.reduce((prev, cur) => {
    let n = Math.trunc(cur / 3) - 2
    return prev + n
  }, 0)
}