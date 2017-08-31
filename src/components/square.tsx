import * as React from 'react'
import * as styles from './square.css'
import {getSquareColor} from '../helpers/board'

interface Props {
  id: string
}
interface State {}

export default class square extends React.Component <Props, State> {

  render(){
    const {id} = this.props
    const squareStyle = [
      styles.container,
      getSquareColor(id)=='black'?  styles.black : styles.white
    ].join(' ')

    return <div className={squareStyle}>{id}</div>
  }
}