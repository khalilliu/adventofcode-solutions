
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n\n')
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
  let ruleReg = /^(.*):\s(\d+-\d+)\sor\s(\d+-\d+)$/
  let [rule, mine, nearby] = arr
  let ruleMap = {}
  rule.split('\n')
    .map(v => v.match(ruleReg).slice(1,4)) 
    .forEach(v => {
      ruleMap[v[0]] = v.slice(1).map(i => i.split('-').map(n => parseInt(n,10)))
    });
  // console.log(ruleMap)
  mine = mine.split('\n').slice(1)[0].split(',').map(v => parseInt(v, 10))
  // console.log(mine)
  nearby = nearby.split('\n').slice(1).map(v => v.split(',').map(n => parseInt(n, 10)))
  let ruleArr = Object.values(ruleMap).reduce((prev, cur) => prev.concat(cur), [])
  for(let i=0; i<nearby.length; i++) {
    for(let j=0; j<nearby[0].length; j++) {
      if(!isValid(nearby[i][j], ruleArr)) {
        nearby[i][j] = 'X'
      }
    }
  }
  nearby = nearby.filter(v => v.indexOf('X') < 0)
  let keys = Object.keys(ruleMap)

  let nearbyArr = []
  for(let i=0; i<nearby[0].length; i++) {
    nearbyArr.push(nearby.map(v => v[i]))
  }
  // store num index in ticket can satisfied rule indexes in the ruleMap 
  let ticketToKey = helper(nearbyArr, keys, ruleMap)
  ticketToKey = Object.entries(ticketToKey).sort((a,b) => a[1].length - b[1].length)

  let ans = [], cur = Array(ticketToKey.length).fill(-1)
  dfs(ticketToKey, ans, cur, 0)
  let result = 1
  for(let i=0; i<ans.length; i++) {
    let keyIndex = ans[i]
    if(keys[keyIndex].startsWith('departure')) {
      result *= mine[i]
    }
  }

  return result
}

function dfs(arr, res, cur, index) {
  if(index == arr.length) {
    res.push(...cur)
    return
  }
  let [ticketIndex, keyArr] = arr[index]
  for(let i=0; i<keyArr.length; i++) {
    if(cur.indexOf(keyArr[i])=== -1) {
      cur[ticketIndex] = keyArr[i]
      dfs(arr, res, cur, index+1)
      cur[ticketIndex] = -1
    }
  }
}


function helper(nearbyArr, keys, ruleMap) {
  let ans = {}
  for(let i=0;i<nearbyArr.length; i++) {
    for(let key of keys) {
      if(isValidArr(nearbyArr[i], ruleMap[key])) {
        if(!ans[i]) {ans[i] = [keys.indexOf(key)]}
        else ans[i].push(keys.indexOf(key))
      }
    }
  }
  return ans
}

function isValidArr(nums, arr) {
  for(let i=0; i<nums.length; i++) {
    let n = nums[i]
    if(!isValid(n, arr)) {
      return false
    }
  }
  return true
}

function isValid(num, arr) {
  for(let i=0; i<arr.length; i++) {
    let [low, high] = arr[i]
    if(num>=low && num <= high) {
      return true
    }
  }
  return false
}

// [2,1,3]

