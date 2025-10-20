import * as reservationAgentsAPI from '../../../src/apis/car-rental/reservation-agents';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Reservation Agents API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listReservationAgents', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'agent-1', name: 'John Doe', role: 'primary' }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await reservationAgentsAPI.listReservationAgents();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/reservation-agents');
      expect(result).toBe(mockResponse);
    });
  });

  describe('assignPrimaryAgent', () => {
    it('should call client.post with correct URL and payload', async () => {
      const payload = { agent_id: 'agent-123' };
      mockClient.post.mockResolvedValue(undefined);

      await reservationAgentsAPI.assignPrimaryAgent('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/assign-primary-agent', payload);
    });
  });

  describe('assignReturnAgent', () => {
    it('should call client.post with correct URL and payload', async () => {
      const payload = { agent_id: 'agent-456' };
      mockClient.post.mockResolvedValue(undefined);

      await reservationAgentsAPI.assignReturnAgent('res-1', payload);

      expect(mockClient.post).toHaveBeenCalledWith('/car-rental/reservations/res-1/assign-return-agent', payload);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/reservation-agents').default;
      
      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listReservationAgents).toBe('function');
      expect(typeof defaultExport.assignPrimaryAgent).toBe('function');
      expect(typeof defaultExport.assignReturnAgent).toBe('function');
    });
  });
});