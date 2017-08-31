import * as Actions from '../constants/actions'

const initialState: Array<PiecePosition> = []

export default function board(state=initialState, {type, payload}): Array<PiecePosition> {

    switch(type){
        case Actions.NOP :
    }
    return state
}