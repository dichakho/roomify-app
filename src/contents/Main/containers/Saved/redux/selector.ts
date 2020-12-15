import {
  createArraySelector,
  createObjectSelector,
} from '@core/utils/selector';

import {
  PARENT_NAME,
  NAME,
  LIST,

} from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const favoritePropertySelector = createArraySelector(root, LIST);
