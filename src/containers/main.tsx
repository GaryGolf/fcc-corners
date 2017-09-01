import * as React from 'react'
import { bindActionCreators, Dispatch, Action } from 'redux'
import DragDropContext from 'react-dnd/lib/DragDropContext'
import {default as HTML5Backend} from 'react-dnd-html5-backend'
const {connect} = require('react-redux')

import ChecksBoard from '../components/checks-board'

interface Props {
  board?: Board
}
interface State {}
@connect(
  state => ({
      board: state.board as Board
  }),
  dispatch => ({
   
  })
)
@DragDropContext(HTML5Backend)
export default class Main extends React.Component <Props, State> {
  render(){
    const {board} = this.props
    if(!board) return null
    return (
      <div>
          <ChecksBoard board={board}/>
      </div>
    )
  }
}