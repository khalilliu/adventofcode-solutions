
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename)
    .toString().split('\n')
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
  return arr.map(calculate).reduce((prev,cur) => cur + prev, 0)
}


function calculate(s) {
  let res = 0, sign = '+', stack = []
  for(let i=0; i<s.length; i++) {
    if(s[i] == ' ') {
      continue
    }else if(isNum(s[i])){
      let v =Number(s[i]), base = 10
      while( i+1 < s.length && isNum(s[i+1])) {
        v = v*base + Number(s[i+1])
        i++
      }
      if(sign == '*') {
        res *= v
      } else if(sign == '+') {
        res += v
      }
    } else if(s[i] == '*') {
      sign = '*'
    } else if(s[i] == '+') {
      sign = '+'
    } else if(s[i] == '(') {
      stack.push(res, sign)
      res = 0
      sign = '+'
    } else if(s[i] == ')') {
      let prevSign = stack.pop(), prevRes = stack.pop()
      if(prevSign == '*') {
        res = prevRes*res
      } else if(prevSign == '+') {
        res = prevRes + res
      }
    }
  }
  return res
}

function isNum(ch) {
  return /\d/.test(ch)
} 
