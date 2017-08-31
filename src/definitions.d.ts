
declare interface Turn {
  from: string
  to: string
}

declare interface PiecePosition {
  id: string
  color: 'black' | 'white'
  square: string
}