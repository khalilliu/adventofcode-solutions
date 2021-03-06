
const fs = require('fs')


function getInput(filename) {
  var bags = fs.readFileSync(filename).toString().split('\n').map(val => val.slice(0, -1))
  let bagMap = {}
  for(let bag of bags) {
    bag = bag.replace(/\sbags/g, '').replace(/\sbag/g, '')
    bag = bag.split('contain ')
    bagMap[bag[0].trim()] = bag[1]
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
  let visited = new Set()
  findParents("shiny gold", bagMap, visited)
  return visited.size
}

function findParents(target, bagMap, visited) {
  for(let parent of Object.keys(bagMap)) {
    let contents = bagMap[parent]
    if(contents.indexOf(target) > -1) {
      findParents(parent, bagMap, visited)
      visited.add(parent)
    }
  }
}
