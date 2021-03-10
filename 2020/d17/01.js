
const fs = require('fs')

function getInput(filename) {
  var arr = fs.readFileSync(filename)
    .toString().split('\n')
    .map(v => v.split('').map(char => char === '#' ? 1 : 0))
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



function solution(arr) {
  let on = new Set(), circles = 6
  let xlen = arr.length, ylen = arr[0].length

  for(let x=0; x<xlen; x++) {
    for(let y=0; y<ylen; y++) {
      if(arr[x][y] === 1) {
        let p = xyz(x,y,0)
        on.add(p)
      }
    }
  }

  for(let i=0; i<circles;i++) {
    let newOn = new Set()
    for(let x=-15; x<15; x++) {
      for(let y=-15; y<15; y++) {
        for(let z=-15; z<15; z++){
          let pxyz = xyz(x,y,z)
          let nbrs = 0
          // start nbrs
          for(let dx of [-1, 0, 1]){
            for(let dy of [-1, 0, 1]) {
              for(let dz of [-1, 0, 1]) {
                if(dx != 0 || dy != 0 || dz != 0) {
                  let nxyz = xyz(x+dx, y+dy, z+dz)
                  if(on.has(nxyz)) {
                    nbrs+=1
                  }
                }
              }
            }
          }
          // end nbrs 
          // transform 
          if(on.has(pxyz) && (nbrs == 2 || nbrs == 3)) {
            newOn.add(pxyz)
          }
          if(!on.has(pxyz) && nbrs == 3) {
            newOn.add(pxyz)
          }
        }
      }
    }
    on = newOn
  }
  return on.size
}

function xyz(x,y,z) {
  return `${x}|${y}|${z}`
}

function getXyz(xyz) {
  return xyz.split('|').map(v => parseInt(v, 10))
}


function deepClone(cubes) {
  let res
  if(Array.isArray(cubes)) {
    res = []
    for(let i=0; i<cubes.length; i++) {
      res.push(deepClone(cubes[i]))
    }
  } else {
    res = cubes
  }
  return res
}




