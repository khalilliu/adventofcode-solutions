
const fs = require('fs')


function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
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
  let res = []
  for(let s of arr) {
    res.push(getResult(s))
  }
  let min = Math.min(...res), max = Math.max(...res)
  return (max+min)*(max-min+1)/2 - res.reduce((a,b) => a+b, 0)
}

function getResult(str) {
  let row = 0, col = 0, rowRange = [0, 127], colRange=[0,7]
  for(let i=0; i<7;i++) {
    if(str[i] == 'F') rowRange[1] = rowRange[0] + ((rowRange[1] - rowRange[0]) >> 1)
    else if(str[i] == 'B') rowRange[0] = rowRange[0] + ((rowRange[1] - rowRange[0]) >> 1) + 1
  }
  row = rowRange[0]
  for(let i=7;i<10;i++) {
    if(str[i] == 'L') colRange[1] = colRange[0] + ((colRange[1] - colRange[0]) >> 1)
    else if(str[i] == 'R') colRange[0] = colRange[0] + ((colRange[1] - colRange[0]) >> 1) + 1
  }
  col = colRange[0]
  return row*8 + col
}
