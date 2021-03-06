
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
  let dp = Array(arr[arr.length-1] + 1).fill(0)
  dp[0] = 0
  dp[1] = arr.indexOf(1) > -1 ? 1 : 0
  dp[2] = arr.indexOf(2) > -1 ? dp[0] + dp[1] + 1 : 0
  for(let i=3; i<dp.length; i++) {
    if(arr.indexOf(i) > -1) {
      dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
    }
  }
  return dp[arr[arr.length-1]]
}


// dp[i] = dp[i-3] + dp[i-2] + dp[i-1]