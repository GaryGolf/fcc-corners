
declare type PieceColor = "white" | "black"

declare interface Turn {
  from: string
  to: string
}

declare interface PiecePosition {
  id: string
  color: PieceColor
  square: string
}

declare interface Piece {
  id: string
  color: PieceColor
}

declare interface Square {
  id: string
  color: PieceColor
  piece: Piece
}

declare type Board = Array<Square>