import {
  createArrayInitialState,
  createObjectInitialState,
} from '@utils/redux';
/**
 * NAME
 */
export const PARENT_NAME = 'main';
export const NAME = 'saved';

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

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = {
  ...createArrayInitialState(NAME),

};
