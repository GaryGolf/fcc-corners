import store from '../store'

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


export function getSquareColor(id:string): PieceColor {
  const [col, r] = id.split('') as [string, number]
  const c = ['*','A','B','C','D','E','F','G','H'].indexOf(col)
  if(c%2+r%2 !== 1) return 'black'
  else return 'white'
}

function ID2Number(id: string): number {
  const rows = ['*','A','B','C','D','E','F','G','H']
  const [c,r] = id.split('') as [string, string]
  const row = Number(r)
  const col = rows.findIndex(item => item == c)
  return col*10+row
}

function Number2ID(id: number): string {
  const rows = ['*','A','B','C','D','E','F','G','H']
  const col = rows[Math.floor(id/10)]
  const row = id%10
  return  col+row
}


function isHavePiece(id: number | string): boolean {
  const state = store.getState()
  if(typeof id == 'number') {
    const square = state.board.find(item => item.id == Number2ID(id))
    return (square && !!square.piece)
  } else if ( typeof id == 'string') {
    const square = state.board.find(item => item.id == id)
    return (square && !!square.piece)
  }
  return false
}

function canMove(from:string, to:string): boolean {
  if(isHavePiece(to)) return false
  const f = ID2Number(from)
  const t = ID2Number(to)
  switch(t){
    case f + 1 :
    case f - 1 :
    case f + 10 :
    case f - 10 :
      return true
    default :
      return false
  }
}

function canJump(from:string, to:string): boolean {
  if(isHavePiece(to)) return false
  
  const f = ID2Number(from)
  const t = ID2Number(to)
  switch(t){
    case f - 2 :
      if(isHavePiece(f-1)) return true
      else return false
    case f + 2 :
      if(isHavePiece(f+1)) return true
      else return false
    case f - 20 :
      if(isHavePiece(f-10)) return true
      else return false
    case f + 20 :
      if(isHavePiece(f-10)) return true
      else return false
    default :
      return false
  }
}

function canHyperJump(from:string, to:string): boolean {
  const state = store.getState()
  let board:string[] = [from]
  const check = (f:string):boolean => {
    
    const a = state.board
      .filter(item=>canJump(f,item.id))
      .map(item=>item.id)

    const b = a.filter(item=>!board.includes(item))

    if(b.includes(to)) return true

    if(!b.length) return false
    board = board.concat(b)
    b.forEach(item => {
      return check(item)
    })
  }
  return check(from)
    //.some(item=>canJump(item.id,to))
}

export function canPieceMove(from:string,to:string): boolean {

  
  
    // const state = store.getState()

  // const fromSquare = state.board.find(item=>item.id == from)
  // const toSquare = state.board.find(item=>item.id == to)
  // const num = ID2Number(from)
  // canHyperJump(from, to)
  if(canJump(from, to)) return true 
  else if(canMove(from, to)) return true
  else if(canHyperJump(from, to)) return true
  
  return false
  
}