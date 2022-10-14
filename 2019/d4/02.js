const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('-').map(Number)
  return arr
}

function main() {
  let arr = getInput('./input.txt')
  let res = solution(arr)
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
  let res = 0
  for(let i=arr[0]; i<=arr[1]; i++) {
    if(isValid(i)) {
      res++
    }
  }
  return res
}

function isValid(num) {
  num += ''
  for(let i=1; i<6;i++) {
    if(num[i] < num[i-1]) return false
  }
  let matches = num.match(/(\d)\1+/g)
  if(!matches || !matches.length) return false
  if(matches.length == 1 && matches[0].length > 2) return false
  if(matches.length == 2 && matches.every(val => val.length === 3)) return false
  return true
}


