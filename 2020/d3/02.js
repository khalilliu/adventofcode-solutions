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
  let steps = [[1,1],[1,3],[1,5],[1,7],[2,1]]
  let res = 1
  for(let step of steps) {
    res *= getTreesNum(arr, step)
  }
  return res
}

function getTreesNum(arr, step) {
  let h = arr.length, w = arr[0].length, res = 0
  let j = 0, i = 0
  while(j < h) {
    if(arr[j][i] == '#') {
      res++
    }
    j+=step[0]
    i+=step[1]
    i%=w
  }
  return res
}
