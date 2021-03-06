
const fs = require('fs')


function getInput(filename) {
  var bags = fs.readFileSync(filename).toString().split('\n').map(val => val.slice(0, -1))
  let bagMap = {}
  for(let bag of bags) {
    bag = bag.replace(/\sbags/g, '').replace(/\sbag/g, '')
    bag = bag.split('contain ')
    let temp = bag[1].split(', ').map(val => {
      if(val === 'no other') {
        return []
      }
      return val.match(/(\d.)\s?(.*)/).slice(1,3)
    })
    bagMap[bag[0].trim()] = temp
  }
  return bagMap
}




function main() {
  let bagMap = getInput('./input.txt')
  let res = solution(bagMap)
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

function solution(bagMap) {
  let target = 'shiny gold', res = 0, map = {}
  dfs(target, bagMap, map)
  console.log(map)
  return res + Object.values(map).reduce((a,b) => a+b, 0)
}

function dfs(target, bagMap, map) {
  if(!bagMap[target] || !bagMap[target].length) return
  for(let bag of bagMap[target]) {
    if(bag.length == 0) continue
    let n = parseInt(bag[0], 10)
    map[bag[1]] = map[bag[1]] ? map[bag[1]] + n : n
    for(let i=0; i<n; i++) {
      dfs(bag[1], bagMap, map)
    }
  }
  return
}
