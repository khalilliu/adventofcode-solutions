const fs = require('fs')

function getInput(filename) {
  let arr = fs.readFileSync(filename)
    .toString().split('\n\n')
  arr = parseInt(arr)
  return arr
}

function parseInt(arr) {
  let map = {}
  arr.forEach(tile => {
    let lines = tile.split('\n')
    let num = Number(lines[0].match(/^Tile\s(\d+):$/)[1])
    let tiles = lines.slice(1).map(item => item.split(''))
    map[num] = tiles
  });
  return map
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
  const S = 10
  const tiles = []

  class Tile {
    constructor(id, cells) {
      this.id = Number(id)
      this.cells = cells // cells[S][S]
    }
    canBelow(b) {
      return this.cells[S-1].join('') == b.cells[0].join('')
    }
    canRight(b){
      for(let row = 0; row < S; row++) {
        if(this.cells[row][S-1] != b.cells[row][0]) {
          return false
        }
      }
      return true
    }
    toString(){
      return this.cells.map(v => v.join('')).join('\n')
    }
  }
 
  for(let key in data) {
    let tile = new Tile(key, data[key])
    for(let f=0; f<2; f++) {
      for(let r=0; r<4; r++) {
        tiles.push(tile)
        tile = new Tile(key,rotate(tile.cells))
      }
      tile = new Tile(key, flip(tile.cells))
    }
  }

  let visited = [], GRID_SIZE = Math.sqrt(tiles.length/8), grid = Array(20).fill(0).map(_ => Array(20).fill(0))

  search(0,0,visited)

  return grid[0][0].id * grid[GRID_SIZE-1][0].id*grid[0][GRID_SIZE-1].id * grid[GRID_SIZE-1][GRID_SIZE-1].id

  function search(row, col, visited) {
    if(row == GRID_SIZE) {
      return 
    }
    for(let tile of tiles) {
      if(!visited.includes(tile.id)) {
        if(row > 0 && !grid[row-1][col].canBelow(tile)) {
          continue
        }
        if(col > 0 && !grid[row][col-1].canRight(tile)) {
          continue
        }

        grid[row][col] = tile
        visited.push(tile.id)
        if(col == GRID_SIZE - 1) {
          search(row+1, 0, visited)
        } else {
          search(row, col+1, visited)
        }
        visited.pop()
      }
    }
  }


  // ================
  //    functions
  // ================

  // 123       369
  // 456  =>   258
  // 789       147
  // 逆时针翻转
  function rotate(a) {
    let n = a.length
    let b = Array(n).fill(0).map(_ => Array(n).fill(0))
    for(let row=0; row<n; row++) {
      for(let col=0; col<n;col++) {
        b[row][col] = a[col][n-1-row]
      }
    }
    return b
  }
 
  // 123      321
  // 456  =>  654
  // 789      987
  function flip(a){
    let n = a.length
    for(let row=0; row<n; row++) {
      for(let col=0; col < Math.trunc(n/2); col++) {
        let t = a[row][col]
        a[row][col] = a[row][n-1-col]
        a[row][n-1-col] = t
      }
    }
    return a
  }

}


