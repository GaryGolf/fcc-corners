export function getSquareColor(id:string): 'black' | 'white' {
  const [col, r] = id.split('') as [string, number]
  const c = ['A','B','C','D','E','F','G','H'].indexOf(col)
  if(c%2 && r%2) return 'white'
  if(c%2 || r%2) return 'black'
}