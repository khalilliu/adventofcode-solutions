const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split(',').map(Number)
  return arr
}



function main() {
  let arr = getInput('./input.txt')
  let res = solution(arr)
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
  arr[1] = 12
  arr[2] = 2

  const target = 19690720
  for(let i=0;i<100;i++) {
    for(let j=0; j<100; j++) {
      let code = [...arr]
      code[1] = i
      code[2] = j
      play(code)
      if(code[0] == target) {
        return 100*i+j
      }
    }
  }

}

function play(arr) {
  let i=0
  while(true) {
    if(arr[i] == 99) 
      break
    if(arr[i] == 1) {
      arr[arr[i+3]] = arr[arr[i+1]] + arr[arr[i+2]]
      i += 3
    } else if(arr[i] == 2) {
      arr[arr[i+3]] = arr[arr[i+1]] * arr[arr[i+2]]
      i += 3
    }
    i++
  }
}