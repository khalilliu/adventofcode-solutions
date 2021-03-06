
const fs = require('fs')


function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n\n')
  arr = arr.map(val => val.split('\n'))
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
  let res = 0
  for(let g of arr) {
    let l = g.length, m = Array(26).fill(0), s = g.join('')
    for(let i=0; i<s.length;i++) {
      m[s[i].charCodeAt(0) - 97]++
    }
    res += m.filter(v => v == l).length
  }
  return res
}
