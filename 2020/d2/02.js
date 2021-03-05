const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
  arr = arr.map(s => s.match(/(\d+)-(\d+)\s(\w{1}):\s(\w+)/).slice(1, 5))
    .map(([a,b,c,d]) => [Number(a), Number(b), c, d])
  return arr
}

/**
 * ======================================
 * 
 *  SOLUTION
 * 
 * ======================================
 */

function validPass(arr) {
  let res = 0
  for(let item of arr) {
    if(isValid(...item)) {
      res++
    }
  }
  return res
}

function isValid(low, high, char,password) {
  return !(password[low-1] == char && password[high-1] == char || password[low-1] != char && password[high-1] != char)
}

function main() {
  let arr = getInput('./input.txt')
  let res = validPass(arr)
  console.log(res)
}


main()
