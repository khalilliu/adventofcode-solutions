
const fs = require('fs')


function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
  .map(val => val.split(' '))
  .map(val => [val[0], parseInt(val[1], 10)])
  return arr
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

function solution(arr) {
  let res = 0, i=0, visited = Array(arr.length).fill(0)
  while(visited[i] == 0) {
    let [cmd, arg] = arr[i]
    visited[i] = 1
    if(cmd == 'acc') {
      res += arg
      i++
    } else if(cmd == 'nop') {
      i++
    } else if(cmd == 'jmp') {
      i += arg
    }
  }
  
  return res
}

