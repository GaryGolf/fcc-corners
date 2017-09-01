import * as React from 'react'
import * as DnD from 'react-dnd'
import DragSource from 'react-dnd/lib/DragSource'
import * as styles from './checks-piece.css'

interface Props {
  id: string
  color: 'black' | 'white'
  // DnD
  isDragging?: boolean
  connectDragSource?: DnD.ConnectDragSource
}
interface State {}

const sourceSpec: DnD.DragSourceSpec<Piece> = {
  beginDrag(props: Props): Piece {
    return { id: props.id, color:props.color } as Piece
  }
}

const collect: DnD.DragSourceCollector = 
    (connect: DnD.DragSourceConnector, monitor: DnD.DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
})

@DragSource('PIECE', sourceSpec, collect)
export default class ChecksPiece extends React.Component <Props, State> {
  render(){
    const {color, connectDragSource } = this.props
    const white = this.props.color === 'white'
    const pieceStyle = [
      styles.container,
      white ? styles.white : styles.black
    ].join(' ')
    
    return connectDragSource(<div className={pieceStyle} />)
  }
}