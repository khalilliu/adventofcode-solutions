const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString().split('\n')
  return arr
}

function twoSum(arr) {
  let m = {}, pairs = [], ans = 0,  target = 2020
  for(let n of arr) {
    if(m[target-n]){
      pairs.push([n, target-n])
    }
    m[n] = true
  }
  for(let pair of pairs) {
    ans = pair[0] * pair[1]
  }
  return ans
}

function main() {
  let arr = getInput('../input.txt')
  arr = arr.map(s => parseInt(s, 10))
  let res = solution(arr)
  console.log(res)
}


main()
