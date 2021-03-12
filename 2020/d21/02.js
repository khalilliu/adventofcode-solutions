const fs = require('fs')
const { Children } = require('react')

function getInput(filename) {
  let arr = fs.readFileSync(filename)
    .toString().split('\n')
  arr = parseInt(arr)
  return arr
}

function parseInt(arr) {
  let res = [], reg = /^(.*)\s\(contains\s(.*)\)$/
  for(let line of arr) {
    let [ingredients, allergens] = line.match(reg).slice(1,3)
    ingredients = ingredients.split(' ')
    allergens = allergens.split(', ')
    res.push({ingredients, allergens})
  }
  return res 
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
  let alergenMap = {}, ingredientSet = new Set()
  data.forEach(food => {
    food.allergens.forEach(alergen => {
      let choices = alergenMap[alergen]
      if(!choices) {
        choices = [...food.ingredients]
      } else {
        choices = intercetion(choices, food.ingredients)
      }
      alergenMap[alergen] = choices
    })
  });
  console.log(alergenMap)
  for(let key in alergenMap) {
    alergenMap[key].forEach(item => {
      ingredientSet.add(item)
    })
  }
  
  let list = []
  for(let key in alergenMap) {
    list.push({key, options: alergenMap[key], ingredient: null})
  }
  let assigned = []
  while(assigned.length < list.length) {
    list.forEach(item => {
      if(item.ingredient) return
      item.options = item.options.filter(v => !assigned.includes(v))
      if(item.options.length === 1) {
        item.ingredient = item.options[0]
        assigned.push(item.ingredient)
      }
    })
  }
  list.sort((a,b) => a.key.localeCompare(b.key))

  return list.map(item => item.ingredient).join(',')
}
function intercetion(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item))
}



