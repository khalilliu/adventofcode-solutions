
const fs = require('fs')
const { string } = require('prop-types')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
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

 // N
 //W  E
//  S

function solution(arr) {
  let buses = arr[1].split(',')
  let nums = buses.filter(n => n != 'x')
    .map(n => [buses.indexOf(String(n)),parseInt(n,10)])
  
  let [time, step] = nums[0]
  for(let i=1; i<nums.length; i++) {
    let [delta, period] = nums[i]
    while(true) {
      if((time+delta)%period == 0) break
      time += step
    }
    step = lcm(step, period)
  }
  return time
}

function lcm(a, b) {
  return Math.trunc(a*b / gcd(a,b))
}

function gcd(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}
