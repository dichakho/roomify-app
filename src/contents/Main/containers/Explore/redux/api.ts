import { get, post, put } from '@utils/api';

export const fetchProperties = (queryString: string) => get(`/properties?${queryString}`);

export const fetchCategories = (queryString: string) => get(`/category?${queryString}`);

export const fetchPropertiesById = (id: number) => get(`/properties/${id}`);

export const fetchRoomsOfProperty = (id: number) => get(`/properties/${id}/rooms`);

export const fetchDetailRoom = (id: number) => get(`/rooms/${id}`);
