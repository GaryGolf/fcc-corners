import * as React from 'react'
import { bindActionCreators, Dispatch, Action } from 'redux'
import DragDropContext from 'react-dnd/lib/DragDropContext'
import {default as HTML5Backend} from 'react-dnd-html5-backend'
import { default as TouchBackend } from 'react-dnd-touch-backend'
import { withRouter, History } from 'react-router-dom'
import * as isMobile from 'ismobilejs'
const {connect} = require('react-redux')
import * as Actions from '../constants/actions'

import ChecksBoard from '../components/checks-board'

interface Props {
  board?: Board
  length?: number
  history?: History
  movePiece?(from:string,to:string):void
  getBack?():void
  dispatch?: Function
}
interface State {}
@withRouter
@connect(
  state => ({
      board: state.board.slice(-1).pop() as Board,
      length: state.board.length as number
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
    this.movePiece = this.movePiece.bind(this)
  }

  componentWillReceiveProps(nextProps){
    const hash = Number(nextProps.history.location.hash.substr(1))
    const len = nextProps.length - 1
    if(hash<len) nextProps.getBack()
  }
  
  movePiece(from:string, to: string){
    const hash = `#${this.props.length}`
    this.props.history.push(hash)
    this.props.movePiece(from, to)
  }

  render(){
    const {board, length} = this.props
    if(!board) return null
    return (
      <div>
          <ChecksBoard 
            board={board}
            movePiece={this.movePiece}
          />
      </div>
    )
  }
}