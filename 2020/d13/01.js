
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
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

 // N
 //W  E
//  S

function solution(arr) {
  let target = parseInt(arr[0], 10)
  let nums = arr[1].split(',').filter(n => n != 'x').map(n => parseInt(n, 10))
  
  // console.log(target, nums)
  let res = []
  for(let i=0; i<nums.length; i++) {
    let n = target % nums[i]
    let t = n == 0 ? target-n : target - n + nums[i]  
    res.push(t)
  }
  let min = Math.min(...res)
  let i = res.indexOf(min)
  return nums[i] * (min-target)
}



