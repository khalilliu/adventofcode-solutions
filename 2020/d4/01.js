
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString()
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
  let target1 = ['byr','iyr','eyr','hgt','hcl','ecl','pid','cid'].sort((a,b) => a.localeCompare(b)).join('')
  let target2 = ['byr','iyr','eyr','hgt','hcl','ecl','pid'].sort((a,b) => a.localeCompare(b)).join('')
  let res = 0

  //format arr
  arr = arr.split('\n\n')
    .map(val => val.split('\n').map(s => s.trim()).join(' ').split(' '))
    .map(val => val.map(s => s.split(':')[0]))
    .map(val => val.sort((a,b) => a.localeCompare(b)).join(''))
  for(let s of arr) {
    if(s === target1 || s === target2) {
      res++
    }
  }
  return res
}
