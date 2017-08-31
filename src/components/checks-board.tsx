import * as React from 'react'
import * as styles from './checks-board.css'

import Square from './square'

interface Props {
  board: Board
}

export default (props:Props) => {

  return (
    <div className={styles.container}>
      {props.board.map(square=><Square key={square.id} id={square.id} piece={square.piece}/>)}
    </div>
  )
}
