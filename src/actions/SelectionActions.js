import {
  SELECT_ITEM,
  CLICK_ITEM,
  RESET_SELECTED,
  SELECT_PARENT
} from '../contstants/actionTypes'


export const selectItem = (payload) => {
  return {
    type: SELECT_ITEM,
    payload
  };
};


export const clickItem = (payload) => {
  return {
    type: CLICK_ITEM,
    payload
  };
};

export const resetSelected = (payload) => {
  return {
    type: RESET_SELECTED,
    payload
  };
};

export const selectParent = () => {
  return (dispatch) => {
    dispatch(selectItem([0, 0]))
  }
}

export const selectNext = () => {

}
