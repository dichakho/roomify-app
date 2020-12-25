import { get, post, put } from '@utils/api';

export const fetchCustomers = (queryString: string) => get(`/salesmen/me/customers?${queryString}`);

export const fetchSavedProperties = (queryString: string) => get(`/favorite-property?${queryString}`);

export const fetchRoomateApi = (queryString: string) => get(`/roommate?${queryString}`);

export const fetchDetailRoomateApi = (id: number) => get(`/roommate/${id}`);
