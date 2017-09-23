import * as Actions from '../constants/actions'

import {placePieces, getPositionPoint, getPositionPoints, canJump, movePiece} from '../helpers/board'

const white = ['F1','F2','F3','F4','G1','G2','G3','G4','H1','H2','H3','H4']
const black = ['A5','A6','A7','A8','B5','B6','B7','B8','C5','C6','C7','C8']

// const black = ['G3','F4']
// const white = ['D2']
const initialState = [placePieces(white,black)]

export default function board(state=initialState, action): Board[] {

    switch(action.type){
        case Actions.NOP :
            break
        case Actions.MAKE_TURN : {
            const board = state.pop()
            const startPoints = getPositionPoints(board)
            const possibleMoves = getPossibleMoves(board)

            const p = possibleMoves
                .map(move=>{
                    const b = movePiece(move.from, move.to, [...board])
                    const points = getPositionPoints(b)
                    return {...move, points}
                }).sort((a,b) => b.points - a.points)

                // .join(' ')
                // .sort((a,b)=>getPositionPoint(b.to)-getPositionPoint(a.to))
            
            // const possibleBoard = possibleMoves 
            //     .map(moves=>{
            //         const board = movePiece()
            //     })

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

                const newBoard = movePiece(p[0].from, p[0].to, board )
                return [...state, newBoard]
                // console.log(p)
                
            // return [...state]
        }
        case Actions.MOVE_PIECE : {
            // find piece
            const { from , to} = action.payload
            const board = state.slice(-1).pop()
            const newBoard = movePiece(from, to, board)
            return [...state, newBoard]
           
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


function getBlackPieces(board:Board):string[]{
    // take black pieces only
    return board
        .filter(item=>item.piece && item.piece.color == 'black')
        .map(item => item.id)
}

interface PossibleMove {
    from: string
    to: string
    jump: number
    points?: number
}

function getPossibleMoves(board:Board): PossibleMove[]{
    return getBlackPieces(board)    
        .map(from => canJump(from, board) // get all possible moves
            .map(to=>({from,to, jump:getPositionPoint(to)-getPositionPoint(from)}))
        ).filter(item=>item.length) // remove nulls
        .reduce((acc,item)=>{
            acc.push(...item)
            return acc
        },[]).sort((a,b)=> b.jump - a.jump)
}
