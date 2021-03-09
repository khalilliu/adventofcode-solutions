
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
  let res = 0
  for(let i=0; i<nearby.length; i++) {
    for(let j=0; j<nearby[0].length; j++) {
      if(!isValid(nearby[i][j], ruleMap)) {
        res += nearby[i][j]
      }
    }
  }
  return res
}



function isValid(num, map) {
  let arr = Object.values(map).reduce((prev, cur) => prev.concat(cur), [])
  for(let i=0; i<arr.length; i++) {
    let [low, high] = arr[i]
    if(num>=low && num <= high) {
      return true
    }
  }
  return false
}

// [2,1,3]

