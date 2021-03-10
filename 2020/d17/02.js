
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
        let p = xyzw(x,y,0,0)
        on.add(p)
      }
    }
  }

  for(let i=0; i<circles;i++) {
    let newOn = new Set()
    for(let x=-15; x<15; x++) {
      for(let y=-15; y<15; y++) {
        for(let z=-15; z<15; z++){
          for(let w=-15; w<15;w++) {
            let pxyzw = xyzw(x,y,z,w)
            let nbrs = 0
            // start nbrs
            for(let dx of [-1, 0, 1]){
              for(let dy of [-1, 0, 1]) {
                for(let dz of [-1, 0, 1]) {
                  for(let dw of [-1,0,1]) {
                    if(dx != 0 || dy != 0 || dz != 0 || dw != 0) {
                      let nxyzw = xyzw(x+dx, y+dy, z+dz, w+dw)
                      if(on.has(nxyzw)) {
                        nbrs+=1
                      }
                    }
                  }
                }
              }
            }
            
            // end nbrs 
            // transform 
            if(on.has(pxyzw) && (nbrs == 2 || nbrs == 3)) {
              newOn.add(pxyzw)
            }
            if(!on.has(pxyzw) && nbrs == 3) {
              newOn.add(pxyzw)
            }
          }
        }
      }
    }
    on = newOn
  }
  return on.size
}

function xyzw(x,y,z,w) {
  return `${x}|${y}|${z}|${w}`
}

function getXyzw(xyzw) {
  return xyzw.split('|').map(v => parseInt(v, 10))
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


