import Symbols from '../sources/Symbols'
import {
  ITEM_SELECT
} from '../contstants/actionTypes';


const INITIAL_STATE = {
  symbols: Symbols
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_SELECT:
      return action.payload;
    default:
      return state;
  }
};
