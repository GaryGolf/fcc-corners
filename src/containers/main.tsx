import * as React from 'react'
import { bindActionCreators, Dispatch, Action } from 'redux'
import DragDropContext from 'react-dnd/lib/DragDropContext'
import {default as HTML5Backend} from 'react-dnd-html5-backend'
import { default as TouchBackend } from 'react-dnd-touch-backend'
import * as isMobile from 'ismobilejs'
const {connect} = require('react-redux')
import * as Actions from '../constants/actions'

import ChecksBoard from '../components/checks-board'

interface Props {
  board?: Board
  movePiece?(from:string,to:string):void
  getBack?():void
}
interface State {}
@connect(
  state => ({
      board: state.board.slice(-1).pop() as Board
  }),
  dispatch => ({
    movePiece: (from, to) => new Promise( resolve => resolve(dispatch({ type: Actions.MOVE_PIECE, payload: {from, to} })))
    .then(_=>  dispatch({type: Actions.MAKE_TURN})),
    getBack: () => dispatch({type: Actions.GET_BACK})

  })
)
@DragDropContext(isMobile.any?TouchBackend:HTML5Backend)
export default class Main extends React.Component <Props, State> {
  constructor(props:Props){
    super(props)
    this.getBack = this.getBack.bind(this)
    window.addEventListener('keyup', this.getBack)
  }
  getBack(event){
    switch(event.key){
      case 'ArrowLeft' :
        this.props.getBack()
      default :
        break
    }
  }
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