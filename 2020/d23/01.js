const fs = require('fs')


function getInput(filename) {
  let arr = fs.readFileSync(filename)
    .toString().split('').map(Number)
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
 function solution (cups) {
  let current = cups[0]
  let state = {current,cups}

  for(let turn=1;turn<=100;turn++){
    state=takeTurn(state)
  }
  return /1(\d+)1/.exec([...state.cups,...state.cups].join(''))[1]
}
function takeTurn ({current,cups}){
  let currIdx = cups.indexOf(current)
  let removed = currIdx+3<cups.length?
    cups.slice(currIdx+1,currIdx+4):
    cups.slice(currIdx+1).concat(cups.slice(0,((currIdx+3)%cups.length)+1))
  let filtered = currIdx+3<cups.length?
    cups.slice(0,currIdx+1).concat(cups.slice(currIdx+4)):
    cups.slice(0,currIdx+1).slice((currIdx+4)%cups.length)

  let destination = current
  do{
    destination = destination==1?cups.length:destination-1
  }while(filtered.indexOf(destination)<0)
  let newIdx = filtered.indexOf(destination)
  let newCups = [
    ...filtered.slice(0,newIdx+1),
    ...removed,
    ...filtered.slice(newIdx+1)
  ]

  return {
    current: newCups[(newCups.indexOf(current)+1) % newCups.length],
    cups:newCups
  }
}



// [1,2,3,4,5,(6),7,8]



