
const fs = require('fs')


function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
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
  const  maskReg = /^mask\s=\s(.+)$/, memReg = /^mem\[(\d+)\]\s=\s(\d+)$/
  let mask = '', memory = {}
  for(let line of arr) {
    if(maskReg.test(line)) {
      mask = line.match(maskReg)[1]
      continue
    }  
    if(memReg.test(line)) {
      let [k, v] = line.match(memReg).slice(1,3)
      let keys = getKeys(mask, k)
      for(let i=0; i<keys.length; i++) {
        memory[keys[i]] = parseInt(v, 10)
      }
    }
  }
  return Object.values(memory).reduce((a,b) => a+b, 0)
}

function getKeys(mask, key) {
  let kArr = toTwo(parseInt(key, 10)).split('')
  let res = []

  for(let i = 0; i<mask.length; i++) {
    if(mask[i] == 0) {
      continue
    } else if(mask[i] == 1) {
      kArr[i] = 1
    } else if(mask[i] == 'X') {
      kArr[i] = 'X'
    }
  }
  dfs([...kArr], res, [], 0)
  return res.map(val => val.join('')).map(toTen)
}

function dfs(arr, res, cur, index) {
  if(cur.length === arr.length) {
    res.push([...cur])
    return
  }
  while(index < arr.length) {
    if(arr[index] === 'X') break
    cur.push(arr[index])
    index++
  }
  if(index == arr.length) {
    res.push([...cur])
    return
  }
  dfs(arr, res, [...cur, '0'], index+1)
  dfs(arr, res, [...cur, '1'], index+1)
}

function toTen(n) {
  let res = 0, step = 1
  for(let i=n.length-1; i>=0; i--) {
    res += n[i]*step
    step *= 2
  }
  return res
}

function toTwo(n) {
  let res = Array(36).fill(0), i = 35
  while(true) {
    reminder = n % 2
    n = Math.trunc(n / 2)
    res[i] = reminder
    if(n == 0) {
      break
    }
    i--
  }
  return res.join('')
}

