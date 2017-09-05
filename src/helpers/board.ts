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

export function canPieceMove(from:string,to:string): boolean {
  
    if(canJump(from).includes(to)) return true
}

export function ID2Number(id: string): number {
  const rows = ['*','A','B','C','D','E','F','G','H']
  const [c,r] = id.split('') as [string, string]
  const row = Number(r)
  const col = rows.findIndex(item => item == c)
  return col*10+row
}

export function Number2ID(id: number): string {
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

function canMove(from:string): Array<string> {
  const f = ID2Number(from)
  return [f+1,f-1,f+10,f-10]
    .filter(item => !isHavePiece(item))
    .map(item => Number2ID(item))
}

function canJumpOver(from:string, to:string): boolean {
  const f = ID2Number(from)
  const t = ID2Number(to)
  switch(t){
    case f - 2  : return isHavePiece(f-1)
    case f + 2  : return isHavePiece(f+1)
    case f - 20 : return isHavePiece(f-10)
    case f + 20 : return isHavePiece(f+10)
    default :     return false
  }
}

export function canJump(from:string): string[] {

  // if(isHavePiece(to)) return []

  const board:string[] = []

  const check = ($from:string): void => {
    store.getState().board.filter(item=>!item.piece)
      .filter(item=>canJumpOver($from,item.id))
      .map(item=>item.id)
      .filter(item=>!board.includes(item))
      .forEach(item =>{
        board.push(item)
        check(item)
      })
  }
  // check nearby squares
  canMove(from).forEach(item=>board.push(item))
  // check jumps
  check(from)
  return board
}

// Position Points min: 1 max: 8

export function getPositionPoint(id: string): number {
  const num = ID2Number(id)
  const a = Math.floor(num/10)
  const b = 9-num%10
  return Math.min(a,b)
}

// Position Points for "black" pieces min: 20 , max: 74
export function getPositionPoints(board: Board, color = 'black'): number {
  return board
    .filter(item=>item.piece && item.piece.color==color)
    .reduce((acc,item)=>{
      acc += getPositionPoint(item.id)
      return acc
    },0)
}