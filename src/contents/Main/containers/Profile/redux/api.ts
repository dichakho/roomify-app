import { get, post, put } from '@utils/api';

export const fetchCustomers = (queryString: string) => get(`/salesmen/me/customers?${queryString}`);

export const fetchProperties = (queryString: string) => get(`/properties?${queryString}`);

export const registerOwnerApi = (data: any) => post('/owner-registration', data);
