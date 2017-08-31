import * as React from 'react'

import Piece from '../components/piece'
import Board from '../components/board'

interface Props {}
interface State {}

export default class Main extends React.Component <Props, State> {
  render(){
    return (
      <div>
          <Board/>
      </div>
    )
  }
}