import * as securityDepositsAPI from '../../../src/apis/car-rental/security-deposits';
import client from '../../../src/client';

jest.mock('../../../src/client');
const mockClient = client as jest.Mocked<typeof client>;

describe('Security Deposits API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listSecurityDeposits', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = [{ id: 'deposit-1', amount: 500 }] as any[];
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await securityDepositsAPI.listSecurityDeposits();

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/security-deposits');
      expect(result).toBe(mockResponse);
    });

    it('should call client.get with query parameters', async () => {
      const mockResponse = [{ id: 'deposit-1', amount: 500 }] as any[];
      const params = { vehicle_type_id: 'vt-1' };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await securityDepositsAPI.listSecurityDeposits(params);

      expect(mockClient.get).toHaveBeenCalledWith(
        '/car-rental/security-deposits?vehicle_type_id=vt-1',
      );
      expect(result).toBe(mockResponse);
    });
  });

  describe('getSecurityDeposit', () => {
    it('should call client.get with correct URL', async () => {
      const mockResponse = { id: 'deposit-1', amount: 500 } as any;
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await securityDepositsAPI.getSecurityDeposit('deposit-1');

      expect(mockClient.get).toHaveBeenCalledWith('/car-rental/security-deposits/deposit-1');
      expect(result).toBe(mockResponse);
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/security-deposits').default;

      expect(defaultExport).toBeDefined();
      expect(typeof defaultExport.listSecurityDeposits).toBe('function');
      expect(typeof defaultExport.getSecurityDeposit).toBe('function');
    });
  });
});
