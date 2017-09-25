import {
  DROP_ITEM
} from '../contstants/actionTypes'


export const dropItem = (payload) => {
  return {
    type: DROP_ITEM,
    payload
  };
};
