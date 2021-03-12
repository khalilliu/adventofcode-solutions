const fs = require('fs')


function getInput(filename) {
  let [rules, messages] = fs.readFileSync(filename)
    .toString().split('\n\n')
  let ruleMap = {}

  
}
function main() {
  let input = getInput('./input.txt')
  let res = solution(input)
  console.log('============= THE ANSWER IS =============')
  console.log(res)
}

main()