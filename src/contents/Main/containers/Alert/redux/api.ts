import { get, post, put } from '@utils/api';

export const fetchCustomers = (queryString: string) => get(`/salesmen/me/customers?${queryString}`);

export const fetchNotification = (queryString: string) => get(`/notifications/mine?${queryString}`);
