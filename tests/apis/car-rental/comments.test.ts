import * as commentsAPI from '../../../src/apis/car-rental/comments';
import client from '../../../src/client';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = client as jest.Mocked<typeof client>;

describe('Comments API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Item Comments', () => {
    describe('listItemComments', () => {
      it('should call client.get with correct URL', async () => {
        const itemId = 'item-123';
        const mockComments = [
          { id: '1', item_id: itemId, content: 'Great item!', created_at: '2024-01-01' },
          { id: '2', item_id: itemId, content: 'Needs maintenance', created_at: '2024-01-02' },
        ];
        mockClient.get.mockResolvedValue(mockComments);

        const result = await commentsAPI.listItemComments(itemId);

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/comments?item_id=item-123');
        expect(result).toEqual(mockComments);
      });

      it('should handle special characters in item ID', async () => {
        const itemId = 'item-with/special%20chars';
        const mockComments = [{ id: '1', item_id: itemId, content: 'Comment with special chars' }];
        mockClient.get.mockResolvedValue(mockComments);

        const result = await commentsAPI.listItemComments(itemId);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/car-rental/comments?item_id=item-with/special%20chars',
        );
        expect(result).toEqual(mockComments);
      });

      it('should handle empty comments list', async () => {
        const itemId = 'item-no-comments';
        const mockComments: any[] = [];
        mockClient.get.mockResolvedValue(mockComments);

        const result = await commentsAPI.listItemComments(itemId);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/car-rental/comments?item_id=item-no-comments',
        );
        expect(result).toEqual(mockComments);
      });
    });

    describe('createItemComment', () => {
      it('should call client.post with correct URL and payload', async () => {
        const itemId = 'item-456';
        const content = 'This is a new comment';
        const mockComment = {
          id: 'comment-new',
          item_id: itemId,
          content,
          created_at: '2024-01-01',
        };
        mockClient.post.mockResolvedValue(mockComment);

        const result = await commentsAPI.createItemComment(itemId, content);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/comments', {
          item_id: itemId,
          content,
        });
        expect(result).toEqual(mockComment);
      });

      it('should handle empty content', async () => {
        const itemId = 'item-empty';
        const content = '';
        const mockComment = {
          id: 'comment-empty',
          item_id: itemId,
          content: '',
        };
        mockClient.post.mockResolvedValue(mockComment);

        const result = await commentsAPI.createItemComment(itemId, content);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/comments', {
          item_id: itemId,
          content: '',
        });
        expect(result).toEqual(mockComment);
      });

      it('should handle long content', async () => {
        const itemId = 'item-long';
        const content =
          'This is a very long comment that spans multiple lines and contains lots of details about the item and its condition.';
        const mockComment = {
          id: 'comment-long',
          item_id: itemId,
          content,
        };
        mockClient.post.mockResolvedValue(mockComment);

        const result = await commentsAPI.createItemComment(itemId, content);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/comments', {
          item_id: itemId,
          content,
        });
        expect(result).toEqual(mockComment);
      });
    });

    describe('updateItemComment', () => {
      it('should call client.put with correct URL and payload', async () => {
        const commentId = 'comment-update';
        const content = 'Updated comment content';
        const mockComment = {
          id: commentId,
          content,
          updated_at: '2024-01-02',
        };
        mockClient.put.mockResolvedValue(mockComment);

        const result = await commentsAPI.updateItemComment(commentId, content);

        expect(mockClient.put).toHaveBeenCalledWith(`/car-rental/comments/${commentId}`, {
          content,
        });
        expect(result).toEqual(mockComment);
      });

      it('should handle special characters in comment ID', async () => {
        const commentId = 'comment-with/special%20chars';
        const content = 'Updated content';
        const mockComment = {
          id: commentId,
          content,
        };
        mockClient.put.mockResolvedValue(mockComment);

        const result = await commentsAPI.updateItemComment(commentId, content);

        expect(mockClient.put).toHaveBeenCalledWith(`/car-rental/comments/${commentId}`, {
          content,
        });
        expect(result).toEqual(mockComment);
      });

      it('should handle empty content update', async () => {
        const commentId = 'comment-empty-update';
        const content = '';
        const mockComment = {
          id: commentId,
          content: '',
        };
        mockClient.put.mockResolvedValue(mockComment);

        const result = await commentsAPI.updateItemComment(commentId, content);

        expect(mockClient.put).toHaveBeenCalledWith(`/car-rental/comments/${commentId}`, {
          content: '',
        });
        expect(result).toEqual(mockComment);
      });
    });

    describe('deleteItemComment', () => {
      it('should call client.delete with correct URL', async () => {
        const commentId = 'comment-delete';
        mockClient.delete.mockResolvedValue(undefined);

        const result = await commentsAPI.deleteItemComment(commentId);

        expect(mockClient.delete).toHaveBeenCalledWith(`/car-rental/comments/${commentId}`);
        expect(result).toBeUndefined();
      });

      it('should handle special characters in comment ID', async () => {
        const commentId = 'comment-delete/special%20chars';
        mockClient.delete.mockResolvedValue(undefined);

        const result = await commentsAPI.deleteItemComment(commentId);

        expect(mockClient.delete).toHaveBeenCalledWith(`/car-rental/comments/${commentId}`);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('Reservation Comments', () => {
    describe('getReservationComments', () => {
      it('should call client.get with correct URL', async () => {
        const reservationId = 'reservation-123';
        const mockComments = [
          { id: '1', reservation_id: reservationId, content: 'Reservation looks good' },
          { id: '2', reservation_id: reservationId, content: 'Customer requested changes' },
        ];
        mockClient.get.mockResolvedValue(mockComments);

        const result = await commentsAPI.getReservationComments(reservationId);

        expect(mockClient.get).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/comments`,
        );
        expect(result).toEqual(mockComments);
      });

      it('should handle special characters in reservation ID', async () => {
        const reservationId = 'reservation-with/special%20chars';
        const mockComments = [
          { id: '1', reservation_id: reservationId, content: 'Special reservation comment' },
        ];
        mockClient.get.mockResolvedValue(mockComments);

        const result = await commentsAPI.getReservationComments(reservationId);

        expect(mockClient.get).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/comments`,
        );
        expect(result).toEqual(mockComments);
      });

      it('should handle empty reservation comments', async () => {
        const reservationId = 'reservation-no-comments';
        const mockComments: any[] = [];
        mockClient.get.mockResolvedValue(mockComments);

        const result = await commentsAPI.getReservationComments(reservationId);

        expect(mockClient.get).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/comments`,
        );
        expect(result).toEqual(mockComments);
      });
    });

    describe('updateReservationComments', () => {
      it('should call client.put with correct URL and payload', async () => {
        const reservationId = 'reservation-update';
        const comments = 'Updated reservation comments';
        const mockComment = {
          id: 'comment-reservation',
          reservation_id: reservationId,
          content: comments,
        };
        mockClient.put.mockResolvedValue(mockComment);

        const result = await commentsAPI.updateReservationComments(reservationId, comments);

        expect(mockClient.put).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/comments`,
          {
            comments,
          },
        );
        expect(result).toEqual(mockComment);
      });

      it('should handle empty comments', async () => {
        const reservationId = 'reservation-empty';
        const comments = '';
        const mockComment = {
          id: 'comment-empty',
          reservation_id: reservationId,
          content: '',
        };
        mockClient.put.mockResolvedValue(mockComment);

        const result = await commentsAPI.updateReservationComments(reservationId, comments);

        expect(mockClient.put).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/comments`,
          {
            comments: '',
          },
        );
        expect(result).toEqual(mockComment);
      });

      it('should handle special characters in reservation ID', async () => {
        const reservationId = 'reservation-with/special%20chars';
        const comments = 'Special reservation update';
        const mockComment = {
          id: 'comment-special',
          reservation_id: reservationId,
          content: comments,
        };
        mockClient.put.mockResolvedValue(mockComment);

        const result = await commentsAPI.updateReservationComments(reservationId, comments);

        expect(mockClient.put).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/comments`,
          {
            comments,
          },
        );
        expect(result).toEqual(mockComment);
      });
    });

    describe('deleteReservationComment', () => {
      it('should call client.delete with correct URL', async () => {
        const reservationId = 'reservation-delete';
        const commentId = 'comment-delete';
        mockClient.delete.mockResolvedValue(undefined);

        const result = await commentsAPI.deleteReservationComment(reservationId, commentId);

        expect(mockClient.delete).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/comments/${commentId}`,
        );
        expect(result).toBeUndefined();
      });

      it('should handle special characters in both IDs', async () => {
        const reservationId = 'reservation-with/special%20chars';
        const commentId = 'comment-with/special%20chars';
        mockClient.delete.mockResolvedValue(undefined);

        const result = await commentsAPI.deleteReservationComment(reservationId, commentId);

        expect(mockClient.delete).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/comments/${commentId}`,
        );
        expect(result).toBeUndefined();
      });
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      expect(commentsAPI.default).toHaveProperty('listItemComments');
      expect(commentsAPI.default).toHaveProperty('createItemComment');
      expect(commentsAPI.default).toHaveProperty('updateItemComment');
      expect(commentsAPI.default).toHaveProperty('deleteItemComment');
      expect(commentsAPI.default).toHaveProperty('getReservationComments');
      expect(commentsAPI.default).toHaveProperty('updateReservationComments');
      expect(commentsAPI.default).toHaveProperty('deleteReservationComment');
    });

    it('should have all functions be the same as named exports', () => {
      expect(commentsAPI.default.listItemComments).toBe(commentsAPI.listItemComments);
      expect(commentsAPI.default.createItemComment).toBe(commentsAPI.createItemComment);
      expect(commentsAPI.default.updateItemComment).toBe(commentsAPI.updateItemComment);
      expect(commentsAPI.default.deleteItemComment).toBe(commentsAPI.deleteItemComment);
      expect(commentsAPI.default.getReservationComments).toBe(commentsAPI.getReservationComments);
      expect(commentsAPI.default.updateReservationComments).toBe(
        commentsAPI.updateReservationComments,
      );
      expect(commentsAPI.default.deleteReservationComment).toBe(
        commentsAPI.deleteReservationComment,
      );
    });
  });

  describe('error handling', () => {
    it('should propagate errors from listItemComments', async () => {
      const error = new Error('Network error');
      mockClient.get.mockRejectedValue(error);

      await expect(commentsAPI.listItemComments('item-id')).rejects.toThrow('Network error');
    });

    it('should propagate errors from createItemComment', async () => {
      const error = new Error('Creation error');
      mockClient.post.mockRejectedValue(error);

      await expect(commentsAPI.createItemComment('item-id', 'content')).rejects.toThrow(
        'Creation error',
      );
    });

    it('should propagate errors from updateItemComment', async () => {
      const error = new Error('Update error');
      mockClient.put.mockRejectedValue(error);

      await expect(commentsAPI.updateItemComment('comment-id', 'content')).rejects.toThrow(
        'Update error',
      );
    });

    it('should propagate errors from deleteItemComment', async () => {
      const error = new Error('Delete error');
      mockClient.delete.mockRejectedValue(error);

      await expect(commentsAPI.deleteItemComment('comment-id')).rejects.toThrow('Delete error');
    });

    it('should propagate errors from getReservationComments', async () => {
      const error = new Error('Reservation comments error');
      mockClient.get.mockRejectedValue(error);

      await expect(commentsAPI.getReservationComments('reservation-id')).rejects.toThrow(
        'Reservation comments error',
      );
    });

    it('should propagate errors from updateReservationComments', async () => {
      const error = new Error('Reservation update error');
      mockClient.put.mockRejectedValue(error);

      await expect(
        commentsAPI.updateReservationComments('reservation-id', 'comments'),
      ).rejects.toThrow('Reservation update error');
    });

    it('should propagate errors from deleteReservationComment', async () => {
      const error = new Error('Reservation comment delete error');
      mockClient.delete.mockRejectedValue(error);

      await expect(
        commentsAPI.deleteReservationComment('reservation-id', 'comment-id'),
      ).rejects.toThrow('Reservation comment delete error');
    });
  });
});
