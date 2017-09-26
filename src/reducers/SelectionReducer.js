import {
  SELECT_ITEM,
  CLICK_ITEM,
  RESET_SELECTED
} from '../contstants/actionTypes';

const INITIAL_STATE = {
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
    default:
      return state;
  }
};
