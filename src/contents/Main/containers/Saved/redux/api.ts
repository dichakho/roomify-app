import { get, post, put } from '@utils/api';

export const fetchCustomers = (queryString: string) => get(`/salesmen/me/customers?${queryString}`);

export const fetchSavedProperties = (queryString: string) => get(`/favorite-property?${queryString}`);
