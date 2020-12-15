import {
  createArraySelector,
  createObjectSelector,
} from '@core/utils/selector';

import {
  PARENT_NAME,
  NAME,
  REGISTER_OWNER,
  MY_PROPERTY,
  AMENITIES,
  UPDATE_PROFILE,
  ME,
} from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const registerOwnerSelector = createObjectSelector(root, REGISTER_OWNER);

export const myPropertySelector = createArraySelector(root, MY_PROPERTY);

export const amenitiesSelector = createArraySelector(root, AMENITIES);

export const updateProfileSelector = createArraySelector(root, UPDATE_PROFILE);

export const getProfileSelector = createObjectSelector(root, ME);
