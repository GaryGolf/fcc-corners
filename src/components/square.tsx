import * as React from 'react'
import * as styles from './square.css'
import {getSquareColor} from '../helpers/board'

import ChecksPiece from './checks-piece'

interface Props {
  id: string
  piece: Piece
}
interface State {}

export default class square extends React.Component <Props, State> {

  render(){
    const {id, piece} = this.props
    const squareStyle = [
      styles.container,
      getSquareColor(id)=='black'?  styles.black : styles.white
    ].join(' ')

    return <div className={squareStyle}>
      {piece && <ChecksPiece id={piece.id} color={piece.color}/>}
    </div>
  }
}