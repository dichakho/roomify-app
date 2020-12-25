import {
  createArraySelector,
  createObjectSelector,
} from '@core/utils/selector';

import {
  PARENT_NAME,
  NAME,
  LIST,
  ROOMATE,
  DETAIL_ROOMATE,

} from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const favoritePropertySelector = createArraySelector(root, LIST);
export const roomateSelector = createArraySelector(root, ROOMATE);
export const detailRoomateSelector = createObjectSelector(root, DETAIL_ROOMATE);
