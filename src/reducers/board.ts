import * as Actions from '../constants/actions'

import {placePieces, getPositionPoint, getPositionPoints, canJump, movePiece} from '../helpers/board'

// const white = ['F1','F2','F3','F4','G1','G2','G3','G4','H1','H2','H3','H4']
// const black = ['A5','A6','A7','A8','B5','B6','B7','B8','C5','C6','C7','C8']

const black = ['G3','F4']
const white = ['D2']
const initialState = placePieces(white,black) 

export default function board(state=initialState, action): Board {

    switch(action.type){
        case Actions.NOP :
            break
        case Actions.MAKE_TURN : {
            const pPoints = getPositionPoints(state)

            const blackPieces = state
                .filter(item=>item.piece && item.piece.color == 'black')
                .map(item => item.id)
                .map(from=>{
                    const to = canJump(from)
                        .sort((a,b)=>getPositionPoint(b)-getPositionPoint(a))
                    console.log(to)
                    if(!!to && to.length) return { from, to:to[0]}
                    return null
                }).filter(item=>!!item)
                .sort((a,b)=>getPositionPoint(b.to)-getPositionPoint(a.to))

            // const freeSquares = state
            //     .filter(item=>!item.piece)
            //     .map(item=>item.id)
            //     .sort((a,b)=>getPositionPoint(b)-getPositionPoint(a))

            // const a = blackPieces.map(from=>{
            //     const to = freeSquares.find(item=>!!canJump(from,item).length)
            //     console.log(to)
            //     return to? {from,to}:null
            // }).filter(item=>!!item)

                
                // action.payload = blackPieces[1]
                console.log(blackPieces[1])

                return movePiece(blackPieces[1].from, blackPieces[1].to, state )
                
            // return [...state]
        }
        case Actions.MOVE_PIECE : {
            // find piece
            const { from , to} = action.payload
            return movePiece(from, to, state)
           
            // const toSquare = state.find(item=>item.id == to && !item.piece)
            // const fromSquare = state.find(item=>item.piece && item.piece.id == from)

            // if(!toSquare || !fromSquare || from == to) return state

            // const color:PieceColor = fromSquare.piece.color
            // fromSquare.piece = null
            // toSquare.piece = {id:to,color}
            // return [...state]
        }
        

    }
    return state
}