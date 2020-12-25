import {
  createArrayInitialState,
  createObjectInitialState,
} from '@utils/redux';
import { fromJS } from 'immutable';
/**
 * NAME
 */
export const PARENT_NAME = 'main';
export const NAME = 'profile';
export const REGISTER_OWNER = 'registerOwner';
export const MY_PROPERTY = 'myProperty';
export const AMENITIES = 'amenities';
export const UPDATE_PROFILE = 'updateProfile';
export const ME = 'me';
export const BOOKED_LIST = 'bookedList';
export const BOOKING_LIST = 'bookingList';

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

export type TRegisterOwner = {
  registerOwner: (state: any, action: any) => any;
  registerOwnerSuccess: (state: any, action: any) => any;
  registerOwnerFail: (state: any, action: any) => any;
};

export type TMyProperty = {
  myPropertyGetList: (state: any, action: any) => any;
  myPropertyGetListSuccess: (state: any, action: any) => any;
  myPropertyGetListFail: (state: any, action: any) => any;
};

export type TAmenities = {
  amenitiesGetList: (state: any, action: any) => any;
  amenitiesGetListSuccess: (state: any, action: any) => any;
  amenitiesGetListFail: (state: any, action: any) => any;
};

export type TUpdateProfile = {
  updateProfile: (state: any, action: any) => any;
  updateProfileSuccess: (state: any, action: any) => any;
  updateProfileFail: (state: any, action: any) => any;
};

export type TMe = {
  getProfile: (state: any, action: any) => any;
  getProfileSuccess: (state: any, action: any) => any;
  getProfileFail: (state: any, action: any) => any;
};
export type TBookedList = {
  bookedGetList: (state: any, action: any) => any;
  bookedGetListSuccess: (state: any, action: any) => any;
  bookedGetListFail: (state: any, action: any) => any;
};
export type TBookingList = {
  bookingGetList: (state: any, action: any) => any;
  bookingGetListSuccess: (state: any, action: any) => any;
  bookingGetListFail: (state: any, action: any) => any;
};

/**
 * ENUM
 */

export enum RoleApi {
  ADMIN = 'ADMIN  ',
  MODERATOR = 'MODERATOR',
  OWNER = 'OWNER',
  USER = 'USER'
}

export enum RoomStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = fromJS({
  payloadProperty: {},
  ...createObjectInitialState(REGISTER_OWNER),
  ...createArrayInitialState(MY_PROPERTY),
  ...createArrayInitialState(AMENITIES),
  ...createObjectInitialState(UPDATE_PROFILE),
  ...createObjectInitialState(ME),
  ...createArrayInitialState(BOOKING_LIST),
  ...createArrayInitialState(BOOKED_LIST),
});
