
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
  let stack = []
  for(let i=0; i<s.length; i++) {
    if(s[i] != ' ') stack.push(s[i])
  }
  stack.push('#')
  return helper(stack)
}

function helper(q) {
  let prev = 0, num = 0, sum = 1, prevOp = '+'
  while(q.length > 0) {
    let c = q.shift()
    if(isNum(c)) {
      num = num * 10 + Number(c)
    } else if(c == '(') {
      num = helper(q)
    } else {
      switch(prevOp) {
        case '*' :
          sum *= prev
          prev =  num
          break
        case '+':
          prev += num
          break
      }
      if(c == ')') break
      prevOp = c
      num = 0
    }
  }

  let res = prev * sum 

  return res
}



function isNum(ch) {
  return /\d/.test(ch)
} 


// 1 + 2 * 3 + 4 * 5 + 6
// 1 + (2 * 3) + (4 * (5 + 6))
// 2 * 3 + (4 * 5)
// 5 + (8 * 3 + 9 + 3 * 4 * 3)
// 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))