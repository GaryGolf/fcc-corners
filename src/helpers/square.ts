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

export function isHavePiece(id: number | string, board:Board): boolean {
    if(typeof id == 'number') {
      const square = board.find(item => item.id == Number2ID(id))
      return (square && !!square.piece)
    } else if ( typeof id == 'string') {
      const square = board.find(item => item.id == id)
      return (square && !!square.piece)
    }
    return false
  }