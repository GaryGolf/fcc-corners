import * as React from 'react'
import { findDOMNode } from 'react-dom'
import * as DnD from 'react-dnd'
import DropTarget from 'react-dnd/lib/DropTarget'
import {getSquareColor, canPieceMove} from '../helpers/board'

import * as styles from './checks-square.css'
import ChecksPiece from './checks-piece'

interface Props {
  id: string
  piece: Piece
  board: Board
  movePiece(fromPosition:string,positiom:string):void
  // DnD
  canDrop?: boolean
  isOver?: boolean
  connectDropTarget?: DnD.ConnectDropTarget
}
interface State {}

const targetSpec:DnD.DropTargetSpec<any> = {

  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem() as Piece
    return canPieceMove(item.id, props.id, props.board)
    // return true
  },

  // hover(props, monitor, component) {
  //   // This is fired very often and lets you perform side effects
  //   // in response to the hover. You can't handle enter and leave
  //   // here—if you need them, put monitor.isOver() into collect() so you
  //   // can just use componentWillReceiveProps() to handle enter/leave.

  //   // You can access the coordinates if you need them
  //   const clientOffset = monitor.getClientOffset();
  //   const componentRect = findDOMNode(component).getBoundingClientRect();

  //   // You can check whether we're over a nested drop target
  //   const isJustOverThisOne = monitor.isOver({ shallow: true });

  //   // You will receive hover() even for items for which canDrop() is false
  //   const canDrop = monitor.canDrop();
  // },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem() as Piece

    // You can do something with it
    props.movePiece(item.id, props.id)
    // console.log(item)

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }


}

const collect = (connect:DnD.DropTargetConnector, monitor:DnD.DropTargetMonitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
})
@DropTarget('PIECE', targetSpec, collect)
export default class ChecksSquare extends React.Component <Props, State> {

  render(){
    const {id, piece, canDrop, connectDropTarget} = this.props
    const squareStyle = [
      styles.container,
      getSquareColor(id)=='black'?  styles.black : styles.white,
      canDrop? styles["can-drop"] : null
    ].join(' ')

    return connectDropTarget(
      <div className={squareStyle}>
        <div className={styles.wrapper}>
          {piece && <ChecksPiece id={piece.id} color={piece.color}/>}
        </div>
      </div>
    )
  }
}