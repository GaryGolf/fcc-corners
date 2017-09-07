import store from '../store'
import {ID2Number, Number2ID, isHavePiece} from './square'

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

export function canPieceMove(from:string, to:string, board:Board): boolean {
  
    if(canJump(from, board).includes(to)) return true
}

function canMove(from:string, board:Board): Array<string> {
  const f = ID2Number(from)
  const r = f%10
  return [f+1,f-1,f+10,f-10]
    .filter(item=>item<=88 && item>=11 && item%10 < 9 && item%10 > 0)
    .filter(item => !isHavePiece(item, board))
    .map(item => Number2ID(item))
}

function canJumpOver(from:string, to:string, board:Board): boolean {
  const f = ID2Number(from)
  const t = ID2Number(to)

  switch(t){
    case f - 2  : return isHavePiece(f-1, board)
    case f + 2  : return isHavePiece(f+1, board)
    case f - 20 : return isHavePiece(f-10, board)
    case f + 20 : return isHavePiece(f+10, board)
    default :     return false
  }
}

export function canJump(from:string, board:Board): string[] {

  // if(isHavePiece(to)) return []

  const stack:string[] = []

  const check = ($from:string): void => {
    board.filter(item=>!item.piece)
      .filter(item=>canJumpOver($from, item.id, board))
      .map(item=>item.id)
      .filter(item=>!stack.includes(item))
      .forEach(item =>{
        stack.push(item)
        check(item)
      })
  }
  // check nearby squares
  canMove(from, board).forEach(item=>stack.push(item))
  // check jumps
  check(from)
  return stack
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

export function movePiece(from: string, to: string, board: Board): Board {
  
    const toSquare = board.find(item=>item.id == to && !item.piece)
    const fromSquare = board.find(item=>item.piece && item.piece.id == from)
  
    if(!toSquare || !fromSquare ) return board
  
    const color:PieceColor = fromSquare.piece.color
    fromSquare.piece = null
    toSquare.piece = {id:to,color}
  
    return [...board]
  }