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

  for(let key in alergenMap) {
    alergenMap[key].forEach(item => {
      ingredientSet.add(item)
    })
  }
  return data.reduce((prev, cur) => {
    return prev + cur.ingredients.reduce((carry, ingredient) => {
      return !ingredientSet.has(ingredient) ? carry+1 : carry
    }, 0)
  }, 0)

}
function intercetion(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item))
}



