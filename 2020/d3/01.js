
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
  return arr
}

function validPass(arr) {
 
}


function main() {
  let arr = getInput('./input.txt')
  console.log(arr)
  let res = validPass(arr)
  console.log(res)
}


main()
