import {
  createArraySelector,
  createObjectSelector,
} from '@core/utils/selector';

import {
  PARENT_NAME,
  NAME,
  PAYLOAD_PROPERTY,
  PROPERTY,
  CATEGORY,
  DETAIL,
  LIST_ROOM,
  DETAIL_ROOM,

} from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const payloadPropertySelector = createObjectSelector(root, PAYLOAD_PROPERTY);

export const propertyListSelector = createArraySelector(root, PROPERTY);

export const categorySelector = createArraySelector(root, CATEGORY);

export const propertyDetailSelector = createObjectSelector(root, DETAIL);

export const roomsOfPropertySelector = createArraySelector(root, LIST_ROOM);

export const detailRoomSelector = createObjectSelector(root, DETAIL_ROOM);
