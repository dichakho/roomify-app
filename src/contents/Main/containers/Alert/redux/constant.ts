import {
  createArrayInitialState,
  createObjectInitialState,
} from '@utils/redux';
/**
 * NAME
 */
export const PARENT_NAME = 'main';
export const NAME = 'explore';
export const PROPERTY = 'property';
export const PAYLOAD_PROPERTY = 'payloadProperty';

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

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = {
  payloadProperty: {},
  ...createArrayInitialState(PROPERTY),

};
