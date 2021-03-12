const fs = require('fs')

function getInput(filename) {
  let arr = fs.readFileSync(filename)
    .toString().split('\n\n')
  arr = parseInt(arr)
  return arr
}

function parseInt(arr) {
  return arr.map(v => v.split('\n').slice(1).map(Number))
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



function solution(data) {
  let [p1, p2] = data
  return play(p1,p2)[0]
}


function play(p1,p2) {
  const visited1 = new Set(), visited2 = new Set()

  while(p1.length > 0 && p2.length > 0) {
    let p1Round = p1.join('|'), p2Round = p2.join('|')
    if(visited1.has(p1Round) || visited2.has(p2Round)) {
      return [calcScore(p1), 1]
    }

    let a = p1.shift(), b = p2.shift()
    if(a <= p1.length && b <= p2.length) {
      let [_, winner] = play(p1.slice(0, a), p2.slice(0, b))
      if(winner == 1) p1.push(a, b)
      else p2.push(b, a)
    } else {
      if(a > b) p1.push(a,b)
      else p2.push(b, a)
    }

    visited1.add(p1Round)
    visited2.add(p2Round)
  }

  let winner = p1.length > 0 ? p1 : p2
  let score = calcScore(winner)
  return [score, p1.length > 0 ? 1 : 2]
}

function calcScore(winner) {
  return winner.reduce((prev, cur, index) => prev + cur * (winner.length - index) , 0)
}








//43 19
//2 29 14


// 19 43 2
// 29 14

// 43 2
// 14 29 19

// 2 43 14
// 29 19

// 43 14
// 19 29 2

// 14 43 19
// 29 2

// 43 19
// 2  29 14
