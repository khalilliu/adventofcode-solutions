const fs = require('fs')



function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
    .map(v => v.split(',').map(t => [t.slice(0,1), Number(t.slice(1))]))
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
  let  cur = [0,0], visited = new Set(), minDis = Infinity
  let stepMap = {U: [0,1], D: [0,-1], L: [-1,0], R: [1,0]}, step1 = [], step2 = []

  for(let step of arr[0]) {
    let [dir, dis] = step
    for(let i=0; i<dis; i++) {
      let x = cur[0] + stepMap[dir][0], y = cur[1] + stepMap[dir][1]
      visited.add(`${x}|${y}`)
      step1.push(`${x}|${y}`)
      cur = [x,y]
    }
  }
  cur = [0,0]
  for(let step of arr[1]) {
    let [dir, dis] = step
    for(let i=0; i<dis; i++) {
      let x = cur[0] + stepMap[dir][0], y = cur[1] + stepMap[dir][1]
      step2.push(`${x}|${y}`)
      if(visited.has(`${x}|${y}`)) {
        minDis = Math.min(minDis, step2.indexOf(`${x}|${y}`)+ 2 + step1.indexOf(`${x}|${y}`))
      }
      cur = [x,y]
    }
  }
  return minDis
}