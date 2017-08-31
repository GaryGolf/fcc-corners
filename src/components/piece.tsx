import * as React from 'react'
import * as styles from './piece.css'

interface Props {
  id: string
  color: 'black' | 'white'
}
interface State {}

export default class Piece extends React.Component <Props, State> {
  render(){
    return (
      <div className={styles.container}>
      </div>
    )
  }
}