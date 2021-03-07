
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')[0].split(',')
  .map(v => parseInt(v, 10))
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
  let prev = arr[arr.length-1], lastSeen = Array(2020).fill(0), cur 
  for (let i=0; i<arr.length-1; i++) {
    lastSeen[arr[i]] = i+1
  }
  for(let i=arr.length; i<2020; i++) {
    cur = i - lastSeen[prev]
    if (cur == i ){
      cur = 0
    }
    // 这个赋值放在cur的求值后面, 是上一轮的赋值
    lastSeen[prev] = i 
    prev = cur
  }
  return prev
}

// [2,1,3]

