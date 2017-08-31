import * as React from 'react'
import * as styles from './square.css'

interface Props {
  id: string
}
interface State {}

export default class square extends React.Component <Props, State> {

  getColor(): 'black' | 'white' {
    const [col, r] = this.props.id.split('') as [string, number]
    const c = ['A','B','C','D','E','F','G','H'].indexOf(col)
    if(c%2 && r%2) return 'white'
    if(c%2 || r%2) return 'black'

  }

  render(){
    const squareStyle = [
      styles.container,
      this.getColor() == 'black'? styles.black : styles.white
    ].join(' ')

    return <div className={squareStyle}>{this.props.id}</div>
  }
}