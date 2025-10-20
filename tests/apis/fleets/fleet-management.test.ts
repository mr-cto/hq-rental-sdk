import fleetManagementAPI, {
  listAdditionalCharges,
  getAdditionalCharge,
  listFeatures,
  getFeature,
  listLocations,
  listRepairOrders,
  AdditionalCharge,
  Feature,
  Location,
  RepairOrder
} from '../../../src/apis/fleets/fleet-management';
import client from '../../../src/client';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet Management API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Additional Charges', () => {
    describe('listAdditionalCharges', () => {
      it('should call client.get with correct URL', async () => {
        const mockCharges: AdditionalCharge[] = [
          {
            id: 'charge-1',
            name: 'GPS Unit',
            description: 'Daily GPS rental',
            amount: 10.00,
            type: 'per_day',
            applicable_to: ['economy', 'standard']
          },
          {
            id: 'charge-2',
            name: 'Insurance Premium',
            amount: 25.00,
            type: 'percentage'
          }
        ];
        mockClient.get.mockResolvedValue(mockCharges);

        const result = await listAdditionalCharges();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/additional-charges');
        expect(result).toEqual(mockCharges);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Network error');
        mockClient.get.mockRejectedValue(error);

        await expect(listAdditionalCharges()).rejects.toThrow('Network error');
      });
    });

    describe('getAdditionalCharge', () => {
      it('should call client.get with correct URL and charge ID', async () => {
        const mockCharge: AdditionalCharge = {
          id: 'charge-1',
          name: 'Child Seat',
          description: 'Infant/toddler car seat',
          amount: 15.00,
          type: 'fixed',
          applicable_to: ['all']
        };
        mockClient.get.mockResolvedValue(mockCharge);

        const result = await getAdditionalCharge('charge-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/additional-charges/charge-1');
        expect(result).toEqual(mockCharge);
      });

      it('should handle special characters in charge ID', async () => {
        const chargeId = 'charge%20special';
        const mockCharge: AdditionalCharge = {
          id: chargeId,
          name: 'Special Charge',
          amount: 5.00,
          type: 'fixed'
        };
        mockClient.get.mockResolvedValue(mockCharge);

        const result = await getAdditionalCharge(chargeId);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/additional-charges/charge%20special');
        expect(result).toEqual(mockCharge);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Charge not found');
        mockClient.get.mockRejectedValue(error);

        await expect(getAdditionalCharge('nonexistent')).rejects.toThrow('Charge not found');
      });
    });
  });

  describe('Features', () => {
    describe('listFeatures', () => {
      it('should call client.get with correct URL', async () => {
        const mockFeatures: Feature[] = [
          {
            id: 'feature-1',
            name: 'Bluetooth',
            description: 'Wireless audio connectivity',
            icon: 'bluetooth-icon',
            category: 'connectivity'
          },
          {
            id: 'feature-2',
            name: 'Air Conditioning',
            description: 'Climate control system',
            category: 'comfort'
          }
        ];
        mockClient.get.mockResolvedValue(mockFeatures);

        const result = await listFeatures();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/features');
        expect(result).toEqual(mockFeatures);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Server error');
        mockClient.get.mockRejectedValue(error);

        await expect(listFeatures()).rejects.toThrow('Server error');
      });
    });

    describe('getFeature', () => {
      it('should call client.get with correct URL and feature ID', async () => {
        const mockFeature: Feature = {
          id: 'feature-1',
          name: 'Navigation System',
          description: 'Built-in GPS navigation',
          icon: 'nav-icon',
          category: 'navigation'
        };
        mockClient.get.mockResolvedValue(mockFeature);

        const result = await getFeature('feature-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/features/feature-1');
        expect(result).toEqual(mockFeature);
      });

      it('should handle special characters in feature ID', async () => {
        const featureId = 'feature-with%20spaces';
        const mockFeature: Feature = {
          id: featureId,
          name: 'Special Feature',
          description: 'A feature with special characters'
        };
        mockClient.get.mockResolvedValue(mockFeature);

        const result = await getFeature(featureId);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/features/feature-with%20spaces');
        expect(result).toEqual(mockFeature);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Feature not found');
        mockClient.get.mockRejectedValue(error);

        await expect(getFeature('nonexistent')).rejects.toThrow('Feature not found');
      });
    });
  });

  describe('Locations', () => {
    describe('listLocations', () => {
      it('should call client.get with correct URL', async () => {
        const mockLocations: Location[] = [
          {
            id: 'loc-1',
            name: 'Downtown Branch',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            postal_code: '10001',
            phone: '+1-555-0123',
            email: 'downtown@example.com',
            coordinates: {
              latitude: 40.7128,
              longitude: -74.0060
            }
          },
          {
            id: 'loc-2',
            name: 'Airport Location',
            address: '456 Airport Blvd',
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
            postal_code: '90045'
          }
        ];
        mockClient.get.mockResolvedValue(mockLocations);

        const result = await listLocations();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/locations');
        expect(result).toEqual(mockLocations);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Database connection failed');
        mockClient.get.mockRejectedValue(error);

        await expect(listLocations()).rejects.toThrow('Database connection failed');
      });
    });
  });

  describe('Repair Orders', () => {
    describe('listRepairOrders', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockRepairOrders: RepairOrder[] = [
          {
            id: 'repair-1',
            vehicle_id: 'veh-1',
            description: 'Oil change required',
            status: 'pending',
            priority: 'medium',
            cost: 50.00,
            scheduled_date: '2024-04-05',
            mechanic: 'John Smith'
          },
          {
            id: 'repair-2',
            vehicle_id: 'veh-2',
            description: 'Brake inspection',
            status: 'in_progress',
            priority: 'high',
            cost: 150.00,
            scheduled_date: '2024-04-03',
            mechanic: 'Jane Doe'
          }
        ];
        mockClient.get.mockResolvedValue(mockRepairOrders);

        const result = await listRepairOrders();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/repair-orders');
        expect(result).toEqual(mockRepairOrders);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = {
          status: 'pending',
          priority: 'high',
          vehicle_id: 'veh-123'
        };
        const mockRepairOrders: RepairOrder[] = [
          {
            id: 'repair-3',
            vehicle_id: 'veh-123',
            description: 'Emergency repair',
            status: 'pending',
            priority: 'urgent'
          }
        ];
        mockClient.get.mockResolvedValue(mockRepairOrders);

        const result = await listRepairOrders(params);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/repair-orders?status=pending&priority=high&vehicle_id=veh-123');
        expect(result).toEqual(mockRepairOrders);
      });

      it('should handle empty params object', async () => {
        const mockRepairOrders: RepairOrder[] = [];
        mockClient.get.mockResolvedValue(mockRepairOrders);

        const result = await listRepairOrders({});

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/repair-orders?');
        expect(result).toEqual(mockRepairOrders);
      });

      it('should handle params with special characters', async () => {
        const params = {
          description: 'tire & brake work',
          mechanic: 'John O\'Connor'
        };
        const mockRepairOrders: RepairOrder[] = [];
        mockClient.get.mockResolvedValue(mockRepairOrders);

        const result = await listRepairOrders(params);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/repair-orders?description=tire+%26+brake+work&mechanic=John+O%27Connor');
        expect(result).toEqual(mockRepairOrders);
      });

      it('should handle undefined params', async () => {
        const mockRepairOrders: RepairOrder[] = [];
        mockClient.get.mockResolvedValue(mockRepairOrders);

        const result = await listRepairOrders(undefined);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/repair-orders');
        expect(result).toEqual(mockRepairOrders);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Access denied');
        mockClient.get.mockRejectedValue(error);

        await expect(listRepairOrders()).rejects.toThrow('Access denied');
      });
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      expect(fleetManagementAPI).toHaveProperty('listAdditionalCharges');
      expect(fleetManagementAPI).toHaveProperty('getAdditionalCharge');
      expect(fleetManagementAPI).toHaveProperty('listFeatures');
      expect(fleetManagementAPI).toHaveProperty('getFeature');
      expect(fleetManagementAPI).toHaveProperty('listLocations');
      expect(fleetManagementAPI).toHaveProperty('listRepairOrders');
    });

    it('should have all functions be the same as named exports', () => {
      expect(fleetManagementAPI.listAdditionalCharges).toBe(listAdditionalCharges);
      expect(fleetManagementAPI.getAdditionalCharge).toBe(getAdditionalCharge);
      expect(fleetManagementAPI.listFeatures).toBe(listFeatures);
      expect(fleetManagementAPI.getFeature).toBe(getFeature);
      expect(fleetManagementAPI.listLocations).toBe(listLocations);
      expect(fleetManagementAPI.listRepairOrders).toBe(listRepairOrders);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from additional charges operations', async () => {
      const error = new Error('API Error');
      mockClient.get.mockRejectedValue(error);

      await expect(listAdditionalCharges()).rejects.toThrow('API Error');
      await expect(getAdditionalCharge('charge-1')).rejects.toThrow('API Error');
    });

    it('should propagate errors from features operations', async () => {
      const error = new Error('Service unavailable');
      mockClient.get.mockRejectedValue(error);

      await expect(listFeatures()).rejects.toThrow('Service unavailable');
      await expect(getFeature('feature-1')).rejects.toThrow('Service unavailable');
    });

    it('should propagate errors from locations operations', async () => {
      const error = new Error('Permission denied');
      mockClient.get.mockRejectedValue(error);

      await expect(listLocations()).rejects.toThrow('Permission denied');
    });

    it('should propagate errors from repair orders operations', async () => {
      const error = new Error('Database error');
      mockClient.get.mockRejectedValue(error);

      await expect(listRepairOrders()).rejects.toThrow('Database error');
      await expect(listRepairOrders({ status: 'pending' })).rejects.toThrow('Database error');
    });
  });
});