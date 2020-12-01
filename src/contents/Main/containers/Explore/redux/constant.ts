import {
  createArrayInitialState,
  createObjectInitialState,
} from '@utils/redux';
import { fromJS } from 'immutable';
/**
 * NAME
 */
export const PARENT_NAME = 'main';
export const NAME = 'explore';
export const PROPERTY = 'property';
export const PAYLOAD_PROPERTY = 'payloadProperty';
export const CATEGORY = 'category';
export const DETAIL = 'detail';
export const LIST_ROOM = 'listRoom';
export const DETAIL_ROOM = 'detailRoom';

/**
 * TYPE
 */
// export type TListCustomer = {
//   customerGetList: (state: any, action: any) => any;
//   customerGetListSuccess: (state: any, action: any) => any;
//   customerGetListFail: (state: any, action: any) => any;
// };
export type TListProperty = {
  propertyGetList: (state: any, action: any) => any;
  propertyGetListSuccess: (state: any, action: any) => any;
  propertyGetListFail: (state: any, action: any) => any;
};

export type TCategories = {
  categoryGetList: (state: any, action: any) => any;
  categoryGetListSuccess: (state: any, action: any) => any;
  categoryGetListFail: (state: any, action: any) => any;
};

export type TDetail = {
  propertyGetDetail: (state: any, action: any) => any;
  propertyGetDetailSuccess: (state: any, action: any) => any;
  propertyGetDetailFail: (state: any, action: any) => any;
};

export type TRoomsOfProperty = {
  roomGetList: (state: any, action: any) => any;
  roomGetListSuccess: (state: any, action: any) => any;
  roomGetListFail: (state: any, action: any) => any;
};

export type TDetailRoom = {
  roomGetDetail: (state: any, action: any) => any;
  roomGetDetailSuccess: (state: any, action: any) => any;
  roomGetDetailFail: (state: any, action: any) => any;
};

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = fromJS({
  payloadProperty: {},
  ...createArrayInitialState(PROPERTY),
  ...createArrayInitialState(CATEGORY),
  ...createObjectInitialState(DETAIL),
  ...createArrayInitialState(LIST_ROOM),
  ...createObjectInitialState(DETAIL_ROOM),
});
