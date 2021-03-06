
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
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
  let height = arr.length, width = arr[0].length, res = 0
  let i=0, j = 0
  while(j < height) {
    if(arr[j][i] == '#') {
      res++
    }
    j++
    i+=3
    i%=width
  } 
  return res
}
