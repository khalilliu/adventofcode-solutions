
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename).toString()
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
  let res = 0
  //format arr
  arr = arr.split('\n\n')
    .map(val => val.split('\n').map(s => s.trim()).join(' ').split(' '))
    .map(val => val.map(s => s.split(':')))
    .map(val => val.reduce((prev,cur) => {prev[cur[0]] = cur[1]; return prev}, {}))
  for(let item of arr) {
    if(isValid(item)) {
      // console.log(item)
      res++
    }
  }
  return res
}


function isValid(passport) {
  let target = ['byr','iyr','eyr','hgt','hcl','ecl','pid','cid']
  for(let key of target) {
    if(key === 'cid') continue
    if(!passport[key]) {
      return false
    }
    let val = passport[key]
    switch(key) {
      case 'byr':
        val = parseInt(val,10)
        if(val < 1920 || val > 2002) return false
        break
      case 'iyr':
        val = parseInt(val,10)
        if(val < 2010 || val > 2020) return false
        break
      case 'eyr':
        val = parseInt(val,10)
        if(val < 2020 || val > 2030) return false
        break
      case 'hgt':
        let [_, num, ext] = val.match(/(\d+)(\w+)/)
        num = parseInt(num,10)
        if(ext == 'cm') {
          if(num < 150 || num > 193) return false
        } else if(ext == 'in') {
          if(num < 59 || num > 76) return false
        } else {
          return false
        }
        break
      case 'hcl':
        if(!/^#[0-9a-f]{6}$/.test(val))return false
        break
      case 'ecl':
        if(['amb','blu','brn','gry','grn','hzl','oth'].indexOf(val) == -1) return false
        break
      case 'pid':
        if(!/^[0-9]{9}$/.test(val)) return false
        break
    }
  }
  return true
}

