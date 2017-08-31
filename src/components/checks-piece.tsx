import * as React from 'react'
import * as styles from './checks-piece.css'

interface Props {
  id: string
  color: 'black' | 'white'
}
interface State {}

export default class ChecksPiece extends React.Component <Props, State> {
  render(){
    const white = this.props.color === 'white'
    const pieceStyle = [
      styles.container,
      white ? styles.white : styles.black
    ].join(' ')
    return (
      <div className={pieceStyle}>
      </div>
    )
  }
}