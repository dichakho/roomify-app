import {
  createArraySelector,
  createObjectSelector,
} from '@core/utils/selector';

import {
  PARENT_NAME,
  NAME,
  PAYLOAD_PROPERTY,

} from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const payloadPropertySelector = createArraySelector(root, PAYLOAD_PROPERTY);
// export const customerDetailSelector = createObjectSelector(
//   root,
//   DETAIL_CUSTOMER,
// );
// export const salemenInviteCustomersSelector = createObjectSelector(
//   root,
//   INVITE,
// );
// export const updateCustomerSelector = createObjectSelector(
//   root,
//   UPDATE_CUSTOMER,
// );
// export const topViewProjectSelector = createArraySelector(root, TOP_VIEW);
// export const outstandingSectionSelector = createArraySelector(
//   root,
//   OUTSTANDING,
// );

// export const listVideoSelector = createArraySelector(root, LISTVIDEO);
