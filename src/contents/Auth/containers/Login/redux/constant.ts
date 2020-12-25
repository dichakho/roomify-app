import { fromJS } from 'immutable';
import { createObjectInitialState } from '@utils/redux';

/**
 * NAME
 */
export const PARENT_NAME = 'auth';
export const NAME = 'login';
export const REGISTER = 'register';

/**
 * TYPE
 */
export type T = {
  login: (state: any, action: any) => any;
  loginSuccess: (state: any, action: any) => any;
  loginFail: (state: any, action: any) => any;
};

export type TRegister = {
  register: (state: any, action: any) => any;
  registerSuccess: (state: any, action: any) => any;
  registerFail: (state: any, action: any) => any;
};

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = fromJS(createObjectInitialState());
