import { combineReducers, Reducer } from 'redux'
import board from './board'

export interface RootState {
  board: PiecePosition[]
}

export default combineReducers<RootState>({board})