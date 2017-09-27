import Symbols from '../sources/Symbols'
import {
  DROP_ITEM,
  SELECT_ITEM,
  CLICK_ITEM,
  RESET_SELECTED
} from '../contstants/actionTypes';


const INITIAL_STATE = {
  symbols: Symbols,
  selected: [],
  lastClicked: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return { ...state, selected: action.payload };
    case CLICK_ITEM:
      return { ...state, lastClicked: action.payload };
    case RESET_SELECTED:
        return { ...state, selected: INITIAL_STATE.selected };
    case DROP_ITEM:
      return { ...state, symbols: action.payload };
    default:
      return state;
  }
};
