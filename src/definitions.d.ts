
declare interface Turn {
  from: string
  to: string
}

declare interface PiecePosition {
  id: string
  color: 'black' | 'white'
  square: string
}

declare interface Piece {
  id: string
  color: 'black' | 'white'
}

declare interface Square {
  id: string
  color: 'black' | 'white'
  piece: Piece
}

declare type Board = Array<Square>