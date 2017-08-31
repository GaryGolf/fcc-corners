export function createBoard(): Board {
  return ['A','B','C','D','E','F','G','H']
  .map(letter=>new Array(8).fill(letter).map((_,idx)=>letter+(idx+1)))
  .reduce((acc,item)=>[...acc,...item],[])
  .map(id=>({ id, color: getSquareColor(id), piece: null }))
}
export function placePieces(white:string[],black:string[], board:Board=createBoard()): Board {
  return board.map(square=>{
    const id = square.id
    let piece:Piece = null
    if(white.includes(id)) piece = { id, color: 'white'}
    if(black.includes(id)) piece = { id, color: 'black'}
    return {...square, piece}
  })
}


export function getSquareColor(id:string): 'black' | 'white' {
  const [col, r] = id.split('') as [string, number]
  const c = ['A','B','C','D','E','F','G','H'].indexOf(col)
  if(c%2+r%2 === 1) return 'black'
  else return 'white'
}