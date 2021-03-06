
const fs = require('fs')


function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n\n')
  arr = arr.map(val => val.split('\n'))
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
  arr = arr.map(val => new Set(val.join('').split('')))
  let res = arr.reduce((prev, cur) => prev + cur.size ,0)
  return res
}
