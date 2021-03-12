const fs = require('fs')


function getInput(filename) {
  let arr = fs.readFileSync(filename)
    .toString().split('\n\n')
  arr = parseInt(arr)
  return arr
}

function parseInt(arr) {
  return arr.map(v => v.split('\n').slice(1).map(Number))
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



function solution(data) {
  let [p1, p2] = data
  while(p1.length != 0 && p2.length != 0) {
    let a = p1.shift(), b = p2.shift()
    if(a > b) {
      p1.push(a, b)
    } else {
      p2.push(b, a)
    }
  }

  let p = p1.length == 0 ? p2 : p1
  return p.reduce((prev, cur, index) => prev + cur * (p.length - index) , 0)
}



