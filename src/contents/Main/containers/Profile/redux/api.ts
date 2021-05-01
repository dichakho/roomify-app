import {
  get, post, put, patch,
} from '@utils/api';

export const registerOwnerApi = (data: any) => post('/owner-registration', data);

export const fetchOwnerPropertyApi = (id: number, queryString: string) => get(`/properties/owner/${id}?${queryString}`);

export const fetchAmenitiesApi = (queryString: string) => get(`/amenities?${queryString}`);

export const updateSelfInfoApi = (data: any) => patch('/auth/me', data);

export const getProfileApi = () => get('/auth/me');

export const getListBookedApi = (queryString: string) => get(`/booking/mine/booking?${queryString}`);
// change
export const getListBookingApi = (queryString: string) => get(`/booking/mine/booked?${queryString}`);
