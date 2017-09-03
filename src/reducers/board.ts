import * as Actions from '../constants/actions'

import {placePieces, getPositionPonits} from '../helpers/board'

const white = ['F1','F2','F3','F4','G1','G2','G3','G4','H1','H2','H3','H4']
const black = ['A5','A6','A7','A8','B5','B6','B7','B8','C5','C6','C7','C8']
const initialState = placePieces(white,black) 

export default function board(state=initialState, action): Board {

    switch(action.type){
        case Actions.NOP :
            break
        case Actions.MOVE_PIECE : {
            // find piece
            const { from , to} = action.payload
           
            const toSquare = state.find(item=>item.id == to && !item.piece)
            const fromSquare = state.find(item=>item.piece && item.piece.id == from)

            if(!toSquare || !fromSquare || from == to) return state

            const color:PieceColor = fromSquare.piece.color
            fromSquare.piece = null
            toSquare.piece = {id:to,color}
            return [...state]
        }

    }
    return state
}