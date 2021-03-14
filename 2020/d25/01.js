const fs = require('fs')


function getInput(filename) {
  let arr = fs.readFileSync(filename)
    .toString().split('\n').map(Number)
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
 function solution (arr) {
  let [card, door] = arr
  let magicNo = 20201227
  let cardLoops = [1]
  while(cardLoops[cardLoops.length-1] != card) {
    let cardKey =(cardLoops[cardLoops.length-1]*7) % magicNo
    cardLoops.push(cardKey)
  }

  let val = 1
  for(let i=1; i<cardLoops.length; i++) {
    val = (val*door) % magicNo
  }
  return val
} 


