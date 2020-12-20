import {
  createArrayInitialState,
  createObjectInitialState,
} from '@utils/redux';
import { fromJS } from 'immutable';
/**
 * NAME
 */
export const PARENT_NAME = 'main';
export const NAME = 'alert';
export const LIST = 'list';

/**
 * TYPE
 */
// export type TListCustomer = {
//   customerGetList: (state: any, action: any) => any;
//   customerGetListSuccess: (state: any, action: any) => any;
//   customerGetListFail: (state: any, action: any) => any;
// };
export type TListNotification = {
  notificationGetList: (state: any, action: any) => any;
  notificationGetListSuccess: (state: any, action: any) => any;
  notificationGetListFail: (state: any, action: any) => any;
};

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = fromJS({
  ...createArrayInitialState(LIST),

});
