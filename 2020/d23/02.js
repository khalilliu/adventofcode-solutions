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
  const turns = 10000000, size = 1000000, allNodes = Array(size), allValues = Array(size)

  class Node {
    constructor(value, next) {
      this.value = value
      this.next = next || this
    }
  }

  for(let i=0; i<cups.length;i++) {
    allValues[i] = cups[i]
  }
  for(let i=cups.length; i<size; i++) {
    allValues[i] = i+1
  }


  allValues.map(value => {
    let currentNode = new Node(value)
    allNodes[value] = currentNode
    return currentNode
  }).forEach((node,index,array) => {
    node.next = array[(index+1) % array.length]
  })

  let currentNode = allNodes[allValues[0]]

  for (let i = 1; i <= turns; i++) {
    currentNode = takeTurn(currentNode)
  }

  const oneNode = allNodes[1]
  const first = oneNode.next
  const second = first.next

  return first.value * second.value


  // ===============
  // Functions
  // ===============
  function takeTurn(currentNode) {
    let minVal = 1, maxVal = allNodes.length - 1
    let first = currentNode.next, second = first.next, third = second.next
    
    let destination = null, potentialDestination = currentNode.value -1
    if(potentialDestination < minVal) potentialDestination = maxVal
    while(destination === null) {
      if([first.value, second.value, third.value].includes(potentialDestination)) {
        potentialDestination = potentialDestination - 1
        if(potentialDestination < minVal) potentialDestination = maxVal
      } else {
        destination = potentialDestination
      }
    }
    currentNode.next = third.next
    third.next = allNodes[destination].next
    allNodes[destination].next = first
    return currentNode.next
  }
}







