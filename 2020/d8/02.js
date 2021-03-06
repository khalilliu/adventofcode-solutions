
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
  let  i=0, visited = Array(arr.length).fill(0)
  while(true) {
    let [cmd, arg] = arr[i]
    visited[i] = 1
    if(cmd == 'acc') {
      i++
    } else if(cmd == 'nop') {
      i++
    } else if(cmd == 'jmp') {
      i += arg
    }
    if(visited[i] == 1) {
      break
    }
  }
  
  for(let i=0; i<visited.length; i++) {
    if(visited[i] == 1) {
      let res = helper(i, deepClone(arr))
      if(res != 0) {
        return res
      }
    }
  }
  return false
}

function helper(index, arr) {
  let res = 0, visited = Array(arr.length).fill(0), i = 0
  if(arr[index][0] == 'jmp') {
    arr[index][0] = 'nop'
  } else if(arr[index][0] == 'nop') {
    arr[index][0] = 'jmp'
  } else {
    return 0
  }

  while(visited[i] === 0 && i < arr.length) {
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
  return i==arr.length ? res : 0
}


function deepClone(arr) {
  let res = []
  for(let i=0; i<arr.length;i++) {
    if(Array.isArray(arr[i])) {
      res[i] = deepClone(arr[i])
    } else {
      res[i] = arr[i]
    }
  }
  return res
}
