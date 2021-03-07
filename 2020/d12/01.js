
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
  .map(val => val.match(/([A-Z]+)(\d+)/).slice(1,3))
  .map(val => [val[0], parseInt(val[1], 10)])
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

 // N
 //W  E
//  S

function solution(arr) {
  console.log(arr)
  let pos = [0, 0] // east, north
  let dirs = [[1,0], [0,-1], [-1,0], [0,1]] 
  let DIR = ['E','S','W','N']
  let dir = 0

  for(let step of arr) {
    let [d, n] = step
    if(d == 'L') {
      n/=90
      dir = (dir-n + dirs.length) % dirs.length
    } else if(d == 'R') {
      n/=90
      dir = (dir+n + dirs.length) % dirs.length
    } else if (d == 'F'){
      pos[0] += dirs[dir][0] * n
      pos[1] += dirs[dir][1] * n
    } else {
      let t = DIR.indexOf(d)
      pos[0] += dirs[t][0] * n
      pos[1] += dirs[t][1] * n
    }
  }
  return Math.abs(pos[0]) + Math.abs(pos[1])
}



