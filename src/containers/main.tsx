import * as React from 'react'
import { bindActionCreators, Dispatch, Action } from 'redux'
import DragDropContext from 'react-dnd/lib/DragDropContext'
import {default as HTML5Backend} from 'react-dnd-html5-backend'
const {connect} = require('react-redux')
import * as Actions from '../constants/actions'

import ChecksBoard from '../components/checks-board'

interface Props {
  board?: Board
  movePiece?(from:string,to:string):void
}
interface State {}
@connect(
  state => ({
      board: state.board as Board
  }),
  dispatch => ({
    movePiece: (from, to) => dispatch({ type: Actions.MOVE_PIECE, payload: {from, to} })
  })
)
@DragDropContext(HTML5Backend)
export default class Main extends React.Component <Props, State> {
  render(){
    const {board, movePiece} = this.props
    if(!board) return null
    return (
      <div>
          <ChecksBoard 
            board={board}
            movePiece={movePiece}
          />
      </div>
    )
  }
}