
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

 //  N *   
 //W   E
//   S

function solution(arr) {
  let pos = [0, 0], wx = 10, wy = 1 // east, north
  let wayDirs = [[1,0],[0,-1],[-1,0],[0,1]] 
  let DIR = ['E','S','W','N']

  for(let step of arr) {
    let [d, n] = step
    if(d == 'L') {
      n/=90
      for(let i=0; i<n; i++) {
        [wx, wy] = [-wy, wx];
      }
    } else if(d == 'R') {
      n/=90
      for(let i=0; i<n; i++) {
        [wx,wy] = [wy, -wx]
      }
    } else if (d == 'F'){
      pos[0] += wx * n 
      pos[1] += wy * n
    } else {
      let t = DIR.indexOf(d)
      wx += wayDirs[t][0] * n
      wy += wayDirs[t][1] * n
    } 
  }
  return Math.abs(pos[0]) + Math.abs(pos[1])
}

