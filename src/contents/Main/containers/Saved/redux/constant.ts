import {
  createArrayInitialState,
  createObjectInitialState,
} from '@utils/redux';
import { fromJS } from 'immutable';
/**
 * NAME
 */
export const PARENT_NAME = 'main';
export const NAME = 'saved';
export const LIST = 'list';
export const ROOMATE = 'roomate';
export const DETAIL_ROOMATE = 'detailRoomate';

/**
 * TYPE
 */
// export type TListCustomer = {
//   customerGetList: (state: any, action: any) => any;
//   customerGetListSuccess: (state: any, action: any) => any;
//   customerGetListFail: (state: any, action: any) => any;
// };
export type TListSaved = {
  savedGetList: (state: any, action: any) => any;
  savedGetListSuccess: (state: any, action: any) => any;
  savedGetListFail: (state: any, action: any) => any;
};

export type TListRoomate= {
  roomateGetList: (state: any, action: any) => any;
  roomateGetListSuccess: (state: any, action: any) => any;
  roomateGetListFail: (state: any, action: any) => any;
};

export type TDetailRoomate= {
  roomateGetDetail: (state: any, action: any) => any;
  roomateGetDetailSuccess: (state: any, action: any) => any;
  roomateGetDetailFail: (state: any, action: any) => any;
};

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = fromJS({
  ...createArrayInitialState(LIST),
  ...createArrayInitialState(ROOMATE),
  ...createObjectInitialState(DETAIL_ROOMATE),

});
