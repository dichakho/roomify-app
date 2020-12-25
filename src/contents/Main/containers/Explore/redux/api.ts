import { get, post, put } from '@utils/api';

export const fetchProperties = (queryString: string) => get(`/properties?${queryString}`);

export const fetchCategories = (queryString: string) => get(`/category?${queryString}`);

export const fetchPropertiesById = (id: number) => get(`/properties/${id}`);

export const fetchRoomsOfProperty = (id: number) => get(`/properties/${id}/rooms`);

export const fetchDetailRoom = (id: number) => get(`/rooms/${id}`);

export const bookingRoomApi = (id: number) => post(`/booking/${id}`);

export const fetchCityApi = (queryString: string) => get(`/destinations/city?${queryString}`);

export const fetchDistrictApi = (id: number) => get(`/destinations/city/${id}/district`);

export const fetchSubDistrictApi = (id: number) => get(`/destinations/city/district/${id}/sub-district`);

export const createPropertyApi = (data: any) => post('/properties', data);

export const favoritePropertyApi = (data: any) => post('/favorite-property', data);

export const getListRoomApi = (queryString: string) => get(`/rooms?${queryString}`);
