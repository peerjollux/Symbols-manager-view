import {
  SELECT_ITEM,
  CLICK_ITEM
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
