import * as reservationAttemptsAPI from '../../../src/apis/car-rental/reservation-attempts';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Reservation Attempts API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listReservationAttempts', () => {
    it('should call client.get with correct URL without params', async () => {
      const mockResponse = [
        {
          id: 'attempt-1',
          email: 'test@test.com',
          status: 'pending',
          attempted_at: '2024-01-15T10:00:00Z',
        },
      ] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await reservationAttemptsAPI.listReservationAttempts();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservation-attempts');
      expect(result).toBe(mockResponse);
    });

    it('should call client.get with correct URL with params', async () => {
      const mockResponse = [
        {
          id: 'attempt-1',
          email: 'test@test.com',
          status: 'completed',
          attempted_at: '2024-01-15T10:00:00Z',
        },
      ] as any[];
      const params = { status: 'completed' };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await reservationAttemptsAPI.listReservationAttempts(params);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/car-rental/reservation-attempts?status=completed',
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('findReservationAttemptsByEmail', () => {
    it('should call client.get with correct URL and encoded email', async () => {
      const mockResponse = [
        {
          id: 'attempt-1',
          email: 'test@test.com',
          status: 'pending',
          attempted_at: '2024-01-15T10:00:00Z',
        },
      ] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await reservationAttemptsAPI.findReservationAttemptsByEmail('test@test.com');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/car-rental/reservation-attempts?email=test%40test.com',
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/reservation-attempts').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listReservationAttempts).toBe('function');
      expect(typeof defaultExport.findReservationAttemptsByEmail).toBe('function');
    });
  });
});
