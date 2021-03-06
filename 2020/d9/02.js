
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
  .map(val => parseInt(val, 10))
  return arr
}

function main() {
  let input = getInput('./input.txt')
  let res = solution(input)
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
  let target = 0
  for(let i=25; i<arr.length; i++) {
    if(!isValid(arr[i], arr.slice(i-25, i))) {
      target = arr[i]
      break
    }
  }

  let preSum = Array(arr.length+1).fill(0)
  for(let i=0; i<arr.length;i++) {
    preSum[i+1] = preSum[i] + arr[i]
  }
  // 1 2 3 4 5
  // 0 1 3 6 10 15
  //     i    j
  let i=0, j = 1
  while(i < arr.length) {
    let res = preSum[j] - preSum[i]
    while(res < target) {
      j++
      res = preSum[j] - preSum[i]
    }
    if(res == target) {
      break
    } else if(res > target) {
      i++
    }
  }
  // console.log('--->', i, j)  i = 407 j = 424
  let nums = arr.slice(i,j)
  return Math.min(...nums) + Math.max(...nums)
}

function isValid(target, nums) {
  let m = {}
  for(let i=0; i<nums.length; i++){
    if(m[target - nums[i]] != undefined) {
      return true
    }
    m[nums[i]] = i
  }
  return false
} 

