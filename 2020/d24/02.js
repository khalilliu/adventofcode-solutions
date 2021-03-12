const fs = require('fs')


function getInput(filename) {
  let arr = fs.readFileSync(filename)
    .toString().split('\n')
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

 *      NW  N  NE
 *  W             E
 *     SW  S  SE
 * 
 * ======================================
 */
 function solution (arr) {

  const stepMap = {nw: [-0.5, -1], ne: [0.5, -1], w: [-1, 0], e: [1, 0], sw: [-0.5, 1], se: [0.5, 1], s: [0, 1]}

  let blackTiles = getBlackTiles(arr)
  
  for(let i=0; i<100; i++) {
    let neighborsMap = {}, newBlackTiles = new Set()
    let blackTilesArr = Array.from(blackTiles).map(v => v.split(',').map(Number))
    blackTilesArr.forEach(([x,y]) => {
      let count = 0
      Object.values(stepMap)
        .map(item => [item[0]+x, item[1] + y])
        .forEach(neighbor => {
          let nbr = neighbor.join(',')
          if(blackTiles.has(nbr)) count++
          if(neighborsMap[nbr]) neighborsMap[nbr]++
          else neighborsMap[nbr] = 1
        })
      if(count > 0 && count <= 2) newBlackTiles.add(`${x},${y}`)
    })

    for(let key in neighborsMap) {
      if(neighborsMap[key] == 2) {
        newBlackTiles.add(key)
      }
    }
    blackTiles = newBlackTiles
  }
 

  return blackTiles.size


  function getBlackTiles(arr){
    let directions = arr.map(row => {
      let chars = row.split('')
      let temp = []
      while(chars.length) {
        let ch = chars.shift()
        if(/n|s/.test(ch)) ch = ch + chars.shift()
        temp.push(ch)
      }
      return temp
    })
  
    const blackTiles = new Set()
  
    directions.forEach(dirs => {
      let [x,y] = [0, 0]
      dirs.forEach(dir=> {
        x += stepMap[dir][0]
        y += stepMap[dir][1]
      })
      let loc = `${x},${y}`
      if(blackTiles.has(loc)) blackTiles.delete(loc)
      else blackTiles.add(loc)
    });
    return blackTiles
  }
  

}






