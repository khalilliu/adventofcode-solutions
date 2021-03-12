const fs = require('fs')

function getInput(filename) {
  let [rules, messages] = fs.readFileSync(filename)
    .toString().split('\n\n')
  messages = messages.split('\n')

  rules = rules.split('\n')
  let ruleRegex = new RegExp(/^(\d+): (.*)$/,)
  let ruleMap = {}

  rules = rules.map(rule => {
    let [string, index, conditions, ...rest] = ruleRegex.exec(rule) || []
    let ruleObj = {
      index, 
      ruleRegexString: null,
      conditionIndexes: [],
      altIndexes: []
    }
    if(/[a-z]/.test(conditions)) {
      ruleObj.ruleRegexString = conditions.replace(/"/g, '')
    } else if (/\|/.test(conditions)) {
      let [l, r] = conditions.split('|').filter(Boolean)
      ruleObj.conditionIndexes = l.split(' ').filter(Boolean)
      ruleObj.altIndexes = r.split(' ').filter(Boolean)
    } else {
      ruleObj.conditionIndexes = conditions.split(' ').filter(Boolean)
    }
    ruleMap[index] = ruleObj
    return ruleObj
  })

  let assignedRule = true
  while(assignedRule) {
    assignedRule = false

    function getRule(index, rule) {
      let conditionRule = ruleMap[index]
      if(conditionRule.ruleRegexString){
        return conditionRule.ruleRegexString
      } else {
        return null
      }
    }

    // console.log(ruleMap)
    rules.forEach(rule => {
      if(rule.ruleRegexString) {return}
      let strings = rule.conditionIndexes.map(index => getRule(index, rule)).filter(Boolean)
      let altStrings = rule.altIndexes.map(index => getRule(index, rule)).filter(Boolean)
      if(strings.length === rule.conditionIndexes.length && altStrings.length === rule.altIndexes.length){
        rule.ruleRegexString = '(' + strings.join('') 
        if(altStrings.length) {
          rule.ruleRegexString = rule.ruleRegexString + '|' + altStrings.join('')
        }
        rule.ruleRegexString = rule.ruleRegexString + ')'
        assignedRule = true
      }
    });
  }
  return [ruleMap, messages]
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



function solution([ruleMap, msgs]) {
  ruleMap[0].ruleRegexString = ruleMap[8].ruleRegexString + ruleMap[11].ruleRegexString
  return msgs.reduce((prev,cur) => {
    let reg = new RegExp('^' + ruleMap[0].ruleRegexString +'$')
    if(reg.test(cur)) {
      return prev += 1
    } else {
      let rule42 = new RegExp('^' + ruleMap[42].ruleRegexString)
      let rule31 = new RegExp(ruleMap[31].ruleRegexString + '$')
      let rule42Count = 0, rule31Count = 0
      while(rule42.test(cur) || rule31.test(cur)) {
        if(rule31.test(cur)) {
          cur = cur.replace(rule31, '')
          rule31Count++
        }
        if(rule42.test(cur)) {
          cur = cur.replace(rule42, '')
          rule42Count++
        }
      }

      if(!cur && rule31Count && rule42Count && (rule42Count >= rule31Count+1)) {
        return prev+1
      }
    }
    return prev
  }, 0 )
} 




