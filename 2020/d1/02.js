const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
  arr = arr.map(s => parseInt(s, 10))
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

function solution(nums) {
  let res = 0, pairs = [], target = 2020
  nums.sort((a,b) => a-b)

  for(let i=0; i<nums.length; i++) {
    if(nums[i] > target) break
    if(i > 0 && nums[i] == nums[i-1]) continue
    let l = i+1, r = nums.length-1
    while(l < r) {
      let sum = nums[i] + nums[l] + nums[r]
      if(sum == target) {
        pairs.push([nums[i], nums[l], nums[r]])
        break
      } else if(sum > target) {
        r--
      } else if(sum < target) {
        l++
      }
    }
  }
  for(let pair of pairs) {
    res = pair.reduce((pre,cur) => cur * pre, 1)
  }
  return res
}