import * as Actions from '../constants/actions'

import {placePieces} from '../helpers/board'

const white = ['F1','F2','F3','F4','G1','G2','G3','G4','H1','H2','H3','H4']
const black = ['A5','A6','A7','A8','B5','B6','B7','B8','C5','C6','C7','C8']
const initialState = placePieces(white,black) 

export default function board(state=initialState, {type, payload}): Board {

    console.log(state)

    switch(type){
        case Actions.NOP :
    }
    return state
}