
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n').map(val => val.split(''))
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

function solution(arr) {
  let h = arr.length, w = arr[0].length, prev = [], cur = deepClone(arr)
  while(!isEqual(cur, prev)) {
    prev = deepClone(cur)
    for(let i=0; i<h; i++) {
      for(let j=0; j<w; j++) {
        if(prev[i][j] == '.') {
          cur[i][j] = '.'
        } else if(prev[i][j] == 'L') {
          if(count(i, j, prev) == 0) {
            cur[i][j] = '#'
          } else {
            cur[i][j] = 'L'
          }
        } else if(prev[i][j] == '#') {
          if(count(i,j,prev) >= 5) {
            cur[i][j] = 'L'
          } else {
            cur[i][j] = '#'
          }
        }
      }
    }
  }
  let res = 0
  for(let i=0; i<h; i++) {
    for(let j=0; j<w; j++) {
      if(cur[i][j] == '#') {
        res++
      }
    }
  }
  return res
}

function count(i,j, arr) {
  let h = arr.length, w = arr[0].length
  let steps = [[-1,-1], [-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
  let res = 0
  for(let step of steps) {
    let y = i+step[0], x = j + step[1]
    while(y >= 0 && y < h && x >=0 && x < w && arr[y][x] == '.') {
      y += step[0]
      x += step[1]
    }
    if(y >= 0 && y < h && x >=0 && x < w && arr[y][x] == '#') {
      res++
    }
  }
  return res
}

function deepClone(arr) {
  let m = Array(arr.length).fill(0)
  for(let i=0; i<arr.length; i++) {
    if(Array.isArray(arr[i])) {
      m[i] = deepClone(arr[i])
    } else {
      m[i] = arr[i]
    }
  }
  return m
}

function isEqual(arr1, arr2) {
  arr1 = arr1.map(val => val.join(''))
  arr2 = arr2.map(val => val.join(''))
  for(let i=0; i<arr1.length; i++) {
    if(arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}


