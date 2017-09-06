import * as React from 'react'
import * as styles from './checks-board.css'

import ChecksSquare from './checks-square'

interface Props {
  board: Board
  movePiece(from:string,to:string):void
}

export default (props:Props) => {

  return (
    <div className={styles.container}>
      {props.board.map(square=>(
        <ChecksSquare 
          key={square.id} 
          id={square.id} 
          piece={square.piece}
          board={props.board}
          movePiece={props.movePiece}
        />
      ))}
    </div>
  )
}
