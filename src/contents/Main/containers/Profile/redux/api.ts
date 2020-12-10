import { get, post, put } from '@utils/api';

export const registerOwnerApi = (data: any) => post('/owner-registration', data);

export const fetchOwnerPropertyApi = (id: number, queryString: string) => get(`/properties/${id}?${queryString}`);

export const fetchAmenitiesApi = (queryString: string) => get(`/amenities?${queryString}`);
