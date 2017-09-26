import Symbols from '../sources/Symbols'
import {
  DROP_ITEM
} from '../contstants/actionTypes';


const INITIAL_STATE = {
  symbols: Symbols
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DROP_ITEM:
      return { ...state, symbols: action.payload };
    default:
      return state;
  }
};
