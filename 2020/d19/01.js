
const fs = require('fs')

function getInput(filename) {
  var [rules, messages] = fs.readFileSync(filename)
    .toString().split('\n\n')
  rules = rules.split('\n').map(v => v.split(':')).reduce((prev,cur) => {prev[cur[0]] = cur[1]; return prev}, {})
  messages = messages.split('\n')
  return [rules, messages]
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



function solution([rules, msgs]) {
  console.log(rules, msgs)
}



