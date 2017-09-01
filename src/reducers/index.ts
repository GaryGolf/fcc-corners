import { combineReducers, Reducer } from 'redux'
import board from './board'

export interface RootState {
  board: Board
}

export default combineReducers<RootState>({board})