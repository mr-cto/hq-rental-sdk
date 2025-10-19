import client from '../client';
import { Rental as RentalType } from '../types';

export const listReservations = async (params?: Record<string, any>): Promise<RentalType[]> => {
    const q = params ? `?${new URLSearchParams(params).toString()}` : '';
    return client.get<RentalType[]>(`/reservations${q}`);
};

export const findReservation = async (reservationId: string): Promise<RentalType> =>
    client.get<RentalType>(`/reservations/${reservationId}`);

export const createReservation = async (payload: Partial<RentalType>): Promise<RentalType> =>
    client.post<RentalType>('/reservations', payload);

export const updateReservation = async (reservationId: string, payload: Partial<RentalType>): Promise<RentalType> =>
    client.put<RentalType>(`/reservations/${reservationId}`, payload);

// Status helpers
export const setReservationOpen = async (reservationId: string) =>
    client.post(`/reservations/${reservationId}/open`);

export const setReservationCancel = async (reservationId: string) =>
    client.post(`/reservations/${reservationId}/cancel`);

export const setReservationPending = async (reservationId: string) =>
    client.post(`/reservations/${reservationId}/pending`);

export const setReservationQuote = async (reservationId: string) =>
    client.post(`/reservations/${reservationId}/quote`);

export const setReservationNoShow = async (reservationId: string) =>
    client.post(`/reservations/${reservationId}/no_show`);

export default {
    listReservations,
    findReservation,
    createReservation,
    updateReservation,
    setReservationOpen,
    setReservationCancel,
    setReservationPending,
    setReservationQuote,
    setReservationNoShow,
};