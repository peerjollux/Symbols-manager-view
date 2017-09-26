import { combineReducers } from 'redux'
import SelectionReducer from './SelectionReducer'
import SymbolsReducer from './SymbolsReducer'

export default combineReducers({
  SelectionReducer,
  SymbolsReducer
})
