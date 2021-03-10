const fs = require('fs')
const { string } = require('prop-types')


function getInput(filename) {
  var [rules, messages] = fs.readFileSync(filename)
    .toString().split('\n\n')
  rules = rules.split('\n').map(v => v.split(': '))
  let rulesArr = []
  for(let i=0; i<rules.length; i++) {
    let [key, match] = rules[i]
    key |= 0
    match = match.split(' | ').map(v => v.split(' ').map(nr => (/\d+/g.test(nr) ? +nr : nr.slice(1,nr.length-1))))
    let isString = typeof match[0][0] === 'string'
    let pair = [key, {isString, match: isString ? match[0] : match}]
    rulesArr.push(pair)
  }
  messages = messages.split('\n')
  return [rulesArr, messages]
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



function solution([rulesArr, msgs]) {
  rulesArr.sort((a,b) => a[0] - b[0])

  const rules = new Map(), stringRules = new Map()
  for(let [key, rule] of rulesArr) {
    rules.set(key, rule)
    if(rule.isString) {
      stringRules.set(key, rule)
    }
  }

  let matchArr = dfs(0, rules, stringRules)
  let res = 0
  for(let msg of msgs) {
    if(matchArr.indexOf(msg) >= 0) {
      res += 1
    }
  }
  return res
} 

function dfs(index, rules,  stringRules) {
  let target = rules.get(index)
  if(target.isString) {
    return stringRules.get(index).match
  }
  let res = new Set()
  for(let nrs of target.match) {
    let tempMatch = []
    for(let nr of nrs) {
      let tempArr = dfs(nr, rules, stringRules)
      if(tempMatch.length == 0 ) {
        tempMatch = [...tempArr]
      } else {
        let t = new Set()
        for(let i=0; i<tempMatch.length; i++) {
          for(let j=0; j<tempArr.length; j++) {
            t.add(tempMatch[i] + tempArr[j])
          }
        }
        tempMatch = Array.from(t)
      }
    }
    for(let match of tempMatch) {
      res.add(match)
    }
  }
  target.match = Array.from(res)
  target.isString = true
  stringRules.set(index, target)
  return target.match
}

// function isStringRule()



