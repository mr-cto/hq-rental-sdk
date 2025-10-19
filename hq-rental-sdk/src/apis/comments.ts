import client from '../client';

export interface Comment {
  id: string;
  item_id?: string;
  reservation_id?: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

// Comments for items
export const listItemComments = async (itemId: string): Promise<Comment[]> =>
  client.get<Comment[]>(`/car-rental/comments?item_id=${itemId}`);

export const createItemComment = async (itemId: string, content: string): Promise<Comment> =>
  client.post<Comment>('/car-rental/comments', { item_id: itemId, content });

export const updateItemComment = async (commentId: string, content: string): Promise<Comment> =>
  client.put<Comment>(`/car-rental/comments/${commentId}`, { content });

export const deleteItemComment = async (commentId: string): Promise<void> =>
  client.delete<void>(`/car-rental/comments/${commentId}`);

// Comments for reservations
export const getReservationComments = async (reservationId: string): Promise<Comment[]> =>
  client.get<Comment[]>(`/car-rental/reservations/${reservationId}/comments`);

export const updateReservationComments = async (reservationId: string, comments: string): Promise<Comment> =>
  client.put<Comment>(`/car-rental/reservations/${reservationId}/comments`, { comments });

export const deleteReservationComment = async (reservationId: string, commentId: string): Promise<void> =>
  client.delete<void>(`/car-rental/reservations/${reservationId}/comments/${commentId}`);

export default {
  listItemComments,
  createItemComment,
  updateItemComment,
  deleteItemComment,
  getReservationComments,
  updateReservationComments,
  deleteReservationComment,
};