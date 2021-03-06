
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
  for(let i=25; i<arr.length; i++) {
    if(!isValid(arr[i], arr.slice(i-25, i))) {
      return arr[i]
    }
  }
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

