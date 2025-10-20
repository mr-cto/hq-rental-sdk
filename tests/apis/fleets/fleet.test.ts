import fleetAPI, {
  listVehicles,
  getVehicle,
  updateVehicle,
  reserveVehicle,
  cancelReservation,
  getMaintenanceHistory,
  listVehicleModels,
  getVehicleModel,
  listVehicleTypes,
  getVehicleType,
  listVehicleBrands,
  getVehicleBrand,
  listVehicleDamages,
  createVehicleDamage,
  getVehicleDamage,
  updateVehicleDamage,
  listBlockedPeriods,
  createBlockedPeriod,
  updateBlockedPeriod,
  deleteBlockedPeriod,
  listRelocations,
  createRelocation,
  deleteRelocation,
  getVehicleOBDHistory,
  getAllOBDHistory,
  getVehicleAlerts,
  getVehicleTrips,
  Vehicle,
  VehicleModel,
  VehicleType,
  VehicleBrand,
  VehicleDamage,
  BlockedPeriod,
  VehicleRelocation,
  MaintenanceRecord,
  TelematicsData,
  VehicleAlert,
  VehicleTrip
} from '../../../src/apis/fleets/fleet';
import client from '../../../src/client';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = client as jest.Mocked<typeof client>;

describe('Fleet API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Vehicle Operations', () => {
    describe('listVehicles', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockVehicles: Vehicle[] = [
          {
            id: 'veh-1',
            make: 'Toyota',
            model: 'Camry',
            year: 2022,
            license_plate: 'ABC-123',
            vin: '1HGBH41JXMN109186',
            status: 'available',
            location_id: 'loc-1',
            mileage: 15000
          },
          {
            id: 'veh-2',
            make: 'Honda',
            model: 'Civic',
            year: 2021,
            license_plate: 'DEF-456',
            status: 'rented',
            location_id: 'loc-2'
          }
        ];
        mockClient.get.mockResolvedValue(mockVehicles);

        const result = await listVehicles();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles');
        expect(result).toEqual(mockVehicles);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = {
          status: 'available',
          location_id: 'loc-1',
          make: 'Toyota'
        };
        const mockVehicles: Vehicle[] = [];
        mockClient.get.mockResolvedValue(mockVehicles);

        const result = await listVehicles(params);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles?status=available&location_id=loc-1&make=Toyota');
        expect(result).toEqual(mockVehicles);
      });

      it('should handle empty params object', async () => {
        const mockVehicles: Vehicle[] = [];
        mockClient.get.mockResolvedValue(mockVehicles);

        const result = await listVehicles({});

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles?');
        expect(result).toEqual(mockVehicles);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Network error');
        mockClient.get.mockRejectedValue(error);

        await expect(listVehicles()).rejects.toThrow('Network error');
      });
    });

    describe('getVehicle', () => {
      it('should call client.get with correct URL and vehicle ID', async () => {
        const mockVehicle: Vehicle = {
          id: 'veh-1',
          make: 'BMW',
          model: 'X3',
          year: 2023,
          license_plate: 'BMW-789',
          status: 'maintenance'
        };
        mockClient.get.mockResolvedValue(mockVehicle);

        const result = await getVehicle('veh-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/veh-1');
        expect(result).toEqual(mockVehicle);
      });

      it('should handle special characters in vehicle ID', async () => {
        const vehicleId = 'veh%20special';
        const mockVehicle: Vehicle = {
          id: vehicleId,
          make: 'Ford',
          model: 'Focus',
          year: 2020,
          license_plate: 'FORD-123',
          status: 'available'
        };
        mockClient.get.mockResolvedValue(mockVehicle);

        const result = await getVehicle(vehicleId);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/veh%20special');
        expect(result).toEqual(mockVehicle);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Vehicle not found');
        mockClient.get.mockRejectedValue(error);

        await expect(getVehicle('nonexistent')).rejects.toThrow('Vehicle not found');
      });
    });

    describe('updateVehicle', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<Vehicle> = {
          status: 'maintenance',
          mileage: 25000
        };
        const mockVehicle: Vehicle = {
          id: 'veh-1',
          make: 'Toyota',
          model: 'Camry',
          year: 2022,
          license_plate: 'ABC-123',
          status: 'maintenance',
          mileage: 25000
        };
        mockClient.put.mockResolvedValue(mockVehicle);

        const result = await updateVehicle('veh-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/fleets/vehicles/veh-1', payload);
        expect(result).toEqual(mockVehicle);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Update failed');
        mockClient.put.mockRejectedValue(error);

        await expect(updateVehicle('veh-1', {})).rejects.toThrow('Update failed');
      });
    });

    describe('reserveVehicle', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload = {
          customer_id: 'cust-1',
          start_date: '2024-04-10',
          end_date: '2024-04-15'
        };
        const mockResponse = { success: true, reservation_id: 'res-1' };
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await reserveVehicle('veh-1', payload);

        expect(mockClient.post).toHaveBeenCalledWith('/fleets/vehicles/veh-1/reserve', payload);
        expect(result).toEqual(mockResponse);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Reservation failed');
        mockClient.post.mockRejectedValue(error);

        await expect(reserveVehicle('veh-1', {})).rejects.toThrow('Reservation failed');
      });
    });

    describe('cancelReservation', () => {
      it('should call client.post with correct URL', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await cancelReservation('veh-1');

        expect(mockClient.post).toHaveBeenCalledWith('/fleets/vehicles/veh-1/cancel-reserve');
      });

      it('should propagate client errors', async () => {
        const error = new Error('Cancellation failed');
        mockClient.post.mockRejectedValue(error);

        await expect(cancelReservation('veh-1')).rejects.toThrow('Cancellation failed');
      });
    });

    describe('getMaintenanceHistory', () => {
      it('should call client.get with correct URL', async () => {
        const mockHistory: MaintenanceRecord[] = [
          {
            id: 'maint-1',
            vehicle_id: 'veh-1',
            type: 'oil_change',
            description: 'Regular oil change',
            date: '2024-03-15',
            cost: 75.00,
            mileage: 20000
          }
        ];
        mockClient.get.mockResolvedValue(mockHistory);

        const result = await getMaintenanceHistory('veh-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/veh-1/maintenance');
        expect(result).toEqual(mockHistory);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Access denied');
        mockClient.get.mockRejectedValue(error);

        await expect(getMaintenanceHistory('veh-1')).rejects.toThrow('Access denied');
      });
    });
  });

  describe('Vehicle Models', () => {
    describe('listVehicleModels', () => {
      it('should call client.get with correct URL', async () => {
        const mockModels: VehicleModel[] = [
          {
            id: 'model-1',
            name: 'Camry',
            brand_id: 'brand-toyota',
            vehicle_type_id: 'type-sedan',
            features: ['bluetooth', 'ac', 'gps']
          }
        ];
        mockClient.get.mockResolvedValue(mockModels);

        const result = await listVehicleModels();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/models');
        expect(result).toEqual(mockModels);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Database error');
        mockClient.get.mockRejectedValue(error);

        await expect(listVehicleModels()).rejects.toThrow('Database error');
      });
    });

    describe('getVehicleModel', () => {
      it('should call client.get with correct URL and model ID', async () => {
        const mockModel: VehicleModel = {
          id: 'model-1',
          name: 'X5',
          brand_id: 'brand-bmw',
          vehicle_type_id: 'type-suv'
        };
        mockClient.get.mockResolvedValue(mockModel);

        const result = await getVehicleModel('model-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/models/model-1');
        expect(result).toEqual(mockModel);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Model not found');
        mockClient.get.mockRejectedValue(error);

        await expect(getVehicleModel('nonexistent')).rejects.toThrow('Model not found');
      });
    });
  });

  describe('Vehicle Types', () => {
    describe('listVehicleTypes', () => {
      it('should call client.get with correct URL', async () => {
        const mockTypes: VehicleType[] = [
          {
            id: 'type-1',
            name: 'Sedan',
            description: '4-door passenger car',
            capacity: 5
          },
          {
            id: 'type-2',
            name: 'SUV',
            description: 'Sport Utility Vehicle',
            capacity: 7
          }
        ];
        mockClient.get.mockResolvedValue(mockTypes);

        const result = await listVehicleTypes();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/types');
        expect(result).toEqual(mockTypes);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Service unavailable');
        mockClient.get.mockRejectedValue(error);

        await expect(listVehicleTypes()).rejects.toThrow('Service unavailable');
      });
    });

    describe('getVehicleType', () => {
      it('should call client.get with correct URL and type ID', async () => {
        const mockType: VehicleType = {
          id: 'type-1',
          name: 'Convertible',
          description: 'Open-top vehicle',
          capacity: 2
        };
        mockClient.get.mockResolvedValue(mockType);

        const result = await getVehicleType('type-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/vehicles/types/type-1');
        expect(result).toEqual(mockType);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Type not found');
        mockClient.get.mockRejectedValue(error);

        await expect(getVehicleType('nonexistent')).rejects.toThrow('Type not found');
      });
    });
  });

  describe('Vehicle Brands', () => {
    describe('listVehicleBrands', () => {
      it('should call client.get with correct URL', async () => {
        const mockBrands: VehicleBrand[] = [
          {
            id: 'brand-1',
            name: 'Toyota',
            logo_url: 'https://example.com/toyota-logo.png'
          },
          {
            id: 'brand-2',
            name: 'Honda'
          }
        ];
        mockClient.get.mockResolvedValue(mockBrands);

        const result = await listVehicleBrands();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/branches');
        expect(result).toEqual(mockBrands);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Authentication failed');
        mockClient.get.mockRejectedValue(error);

        await expect(listVehicleBrands()).rejects.toThrow('Authentication failed');
      });
    });

    describe('getVehicleBrand', () => {
      it('should call client.get with correct URL and brand ID', async () => {
        const mockBrand: VehicleBrand = {
          id: 'brand-1',
          name: 'Mercedes-Benz',
          logo_url: 'https://example.com/mb-logo.png'
        };
        mockClient.get.mockResolvedValue(mockBrand);

        const result = await getVehicleBrand('brand-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/branches/brand-1');
        expect(result).toEqual(mockBrand);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Brand not found');
        mockClient.get.mockRejectedValue(error);

        await expect(getVehicleBrand('nonexistent')).rejects.toThrow('Brand not found');
      });
    });
  });

  describe('Vehicle Damages', () => {
    describe('listVehicleDamages', () => {
      it('should call client.get with correct URL and vehicle ID', async () => {
        const mockDamages: VehicleDamage[] = [
          {
            id: 'damage-1',
            vehicle_id: 'veh-1',
            description: 'Scratch on front bumper',
            severity: 'minor',
            location: 'front',
            reported_at: '2024-04-01T10:00:00Z',
            cost: 250.00
          }
        ];
        mockClient.get.mockResolvedValue(mockDamages);

        const result = await listVehicleDamages('veh-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/damages?vehicle_id=veh-1');
        expect(result).toEqual(mockDamages);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Unauthorized access');
        mockClient.get.mockRejectedValue(error);

        await expect(listVehicleDamages('veh-1')).rejects.toThrow('Unauthorized access');
      });
    });

    describe('createVehicleDamage', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<VehicleDamage> = {
          vehicle_id: 'veh-1',
          description: 'Dent on side door',
          severity: 'major',
          location: 'left side',
          cost: 500.00
        };
        const mockDamage: VehicleDamage = {
          ...payload as VehicleDamage,
          id: 'damage-new',
          reported_at: '2024-04-02T14:30:00Z'
        };
        mockClient.post.mockResolvedValue(mockDamage);

        const result = await createVehicleDamage(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/fleets/damages', payload);
        expect(result).toEqual(mockDamage);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Creation failed');
        mockClient.post.mockRejectedValue(error);

        await expect(createVehicleDamage({})).rejects.toThrow('Creation failed');
      });
    });

    describe('getVehicleDamage', () => {
      it('should call client.get with correct URL and damage ID', async () => {
        const mockDamage: VehicleDamage = {
          id: 'damage-1',
          vehicle_id: 'veh-1',
          description: 'Broken headlight',
          severity: 'critical',
          location: 'front left',
          reported_at: '2024-04-01T08:00:00Z'
        };
        mockClient.get.mockResolvedValue(mockDamage);

        const result = await getVehicleDamage('damage-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/damages/damage-1');
        expect(result).toEqual(mockDamage);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Damage record not found');
        mockClient.get.mockRejectedValue(error);

        await expect(getVehicleDamage('nonexistent')).rejects.toThrow('Damage record not found');
      });
    });

    describe('updateVehicleDamage', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<VehicleDamage> = {
          severity: 'minor',
          cost: 150.00
        };
        const mockDamage: VehicleDamage = {
          id: 'damage-1',
          vehicle_id: 'veh-1',
          description: 'Paint scratch',
          severity: 'minor',
          location: 'rear',
          reported_at: '2024-04-01T08:00:00Z',
          cost: 150.00
        };
        mockClient.put.mockResolvedValue(mockDamage);

        const result = await updateVehicleDamage('damage-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/fleets/damages/damage-1', payload);
        expect(result).toEqual(mockDamage);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Update failed');
        mockClient.put.mockRejectedValue(error);

        await expect(updateVehicleDamage('damage-1', {})).rejects.toThrow('Update failed');
      });
    });
  });

  describe('Blocked Periods', () => {
    describe('listBlockedPeriods', () => {
      it('should call client.get with correct URL and vehicle ID', async () => {
        const mockPeriods: BlockedPeriod[] = [
          {
            id: 'block-1',
            vehicle_id: 'veh-1',
            start_date: '2024-04-10',
            end_date: '2024-04-12',
            reason: 'Maintenance scheduled',
            created_at: '2024-04-01T09:00:00Z'
          }
        ];
        mockClient.get.mockResolvedValue(mockPeriods);

        const result = await listBlockedPeriods('veh-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/blocked-periods?vehicle_id=veh-1');
        expect(result).toEqual(mockPeriods);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Query failed');
        mockClient.get.mockRejectedValue(error);

        await expect(listBlockedPeriods('veh-1')).rejects.toThrow('Query failed');
      });
    });

    describe('createBlockedPeriod', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<BlockedPeriod> = {
          vehicle_id: 'veh-1',
          start_date: '2024-04-15',
          end_date: '2024-04-17',
          reason: 'Deep cleaning'
        };
        const mockPeriod: BlockedPeriod = {
          ...payload as BlockedPeriod,
          id: 'block-new',
          created_at: '2024-04-05T10:00:00Z'
        };
        mockClient.post.mockResolvedValue(mockPeriod);

        const result = await createBlockedPeriod(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/fleets/blocked-periods', payload);
        expect(result).toEqual(mockPeriod);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Period creation failed');
        mockClient.post.mockRejectedValue(error);

        await expect(createBlockedPeriod({})).rejects.toThrow('Period creation failed');
      });
    });

    describe('updateBlockedPeriod', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<BlockedPeriod> = {
          end_date: '2024-04-18',
          reason: 'Extended maintenance'
        };
        const mockPeriod: BlockedPeriod = {
          id: 'block-1',
          vehicle_id: 'veh-1',
          start_date: '2024-04-15',
          end_date: '2024-04-18',
          reason: 'Extended maintenance'
        };
        mockClient.put.mockResolvedValue(mockPeriod);

        const result = await updateBlockedPeriod('block-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/fleets/blocked-periods/block-1', payload);
        expect(result).toEqual(mockPeriod);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Update not allowed');
        mockClient.put.mockRejectedValue(error);

        await expect(updateBlockedPeriod('block-1', {})).rejects.toThrow('Update not allowed');
      });
    });

    describe('deleteBlockedPeriod', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await deleteBlockedPeriod('block-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/fleets/blocked-periods/block-1');
      });

      it('should propagate client errors', async () => {
        const error = new Error('Deletion failed');
        mockClient.delete.mockRejectedValue(error);

        await expect(deleteBlockedPeriod('block-1')).rejects.toThrow('Deletion failed');
      });
    });
  });

  describe('Relocations', () => {
    describe('listRelocations', () => {
      it('should call client.get with correct URL', async () => {
        const mockRelocations: VehicleRelocation[] = [
          {
            id: 'reloc-1',
            vehicle_id: 'veh-1',
            from_location_id: 'loc-1',
            to_location_id: 'loc-2',
            scheduled_date: '2024-04-20',
            status: 'pending'
          }
        ];
        mockClient.get.mockResolvedValue(mockRelocations);

        const result = await listRelocations();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/relocations');
        expect(result).toEqual(mockRelocations);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Access denied');
        mockClient.get.mockRejectedValue(error);

        await expect(listRelocations()).rejects.toThrow('Access denied');
      });
    });

    describe('createRelocation', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<VehicleRelocation> = {
          vehicle_id: 'veh-2',
          from_location_id: 'loc-2',
          to_location_id: 'loc-3',
          scheduled_date: '2024-04-25'
        };
        const mockRelocation: VehicleRelocation = {
          ...payload as VehicleRelocation,
          id: 'reloc-new',
          status: 'pending'
        };
        mockClient.post.mockResolvedValue(mockRelocation);

        const result = await createRelocation(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/fleets/relocations', payload);
        expect(result).toEqual(mockRelocation);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Relocation scheduling failed');
        mockClient.post.mockRejectedValue(error);

        await expect(createRelocation({})).rejects.toThrow('Relocation scheduling failed');
      });
    });

    describe('deleteRelocation', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await deleteRelocation('reloc-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/fleets/relocations/reloc-1');
      });

      it('should propagate client errors', async () => {
        const error = new Error('Cancellation not allowed');
        mockClient.delete.mockRejectedValue(error);

        await expect(deleteRelocation('reloc-1')).rejects.toThrow('Cancellation not allowed');
      });
    });
  });

  describe('Telematics', () => {
    describe('getVehicleOBDHistory', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockData: TelematicsData[] = [
          {
            id: 'tel-1',
            vehicle_id: 'veh-1',
            timestamp: '2024-04-01T12:00:00Z',
            latitude: 40.7128,
            longitude: -74.0060,
            speed: 35,
            fuel_level: 75,
            data: { temperature: 20 }
          }
        ];
        mockClient.get.mockResolvedValue(mockData);

        const result = await getVehicleOBDHistory('veh-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/vehicles/veh-1/obd');
        expect(result).toEqual(mockData);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = {
          start_date: '2024-04-01',
          end_date: '2024-04-07',
          limit: '100'
        };
        const mockData: TelematicsData[] = [];
        mockClient.get.mockResolvedValue(mockData);

        const result = await getVehicleOBDHistory('veh-1', params);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/vehicles/veh-1/obd?start_date=2024-04-01&end_date=2024-04-07&limit=100');
        expect(result).toEqual(mockData);
      });

      it('should handle empty params object', async () => {
        const mockData: TelematicsData[] = [];
        mockClient.get.mockResolvedValue(mockData);

        const result = await getVehicleOBDHistory('veh-1', {});

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/vehicles/veh-1/obd?');
        expect(result).toEqual(mockData);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Telematics service unavailable');
        mockClient.get.mockRejectedValue(error);

        await expect(getVehicleOBDHistory('veh-1')).rejects.toThrow('Telematics service unavailable');
      });
    });

    describe('getAllOBDHistory', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockData: TelematicsData[] = [
          {
            id: 'tel-1',
            vehicle_id: 'veh-1',
            timestamp: '2024-04-01T12:00:00Z',
            data: { rpm: 2000 }
          }
        ];
        mockClient.get.mockResolvedValue(mockData);

        const result = await getAllOBDHistory();

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/obd');
        expect(result).toEqual(mockData);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = {
          vehicle_id: 'veh-1',
          date: '2024-04-01'
        };
        const mockData: TelematicsData[] = [];
        mockClient.get.mockResolvedValue(mockData);

        const result = await getAllOBDHistory(params);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/obd?vehicle_id=veh-1&date=2024-04-01');
        expect(result).toEqual(mockData);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Data retrieval failed');
        mockClient.get.mockRejectedValue(error);

        await expect(getAllOBDHistory()).rejects.toThrow('Data retrieval failed');
      });
    });

    describe('getVehicleAlerts', () => {
      it('should call client.get with correct URL', async () => {
        const mockAlerts: VehicleAlert[] = [
          {
            id: 'alert-1',
            vehicle_id: 'veh-1',
            type: 'engine_warning',
            severity: 'warning',
            message: 'Engine temperature high',
            timestamp: '2024-04-01T15:30:00Z',
            resolved: false
          }
        ];
        mockClient.get.mockResolvedValue(mockAlerts);

        const result = await getVehicleAlerts('veh-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/vehicles/veh-1/alerts');
        expect(result).toEqual(mockAlerts);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Alert system offline');
        mockClient.get.mockRejectedValue(error);

        await expect(getVehicleAlerts('veh-1')).rejects.toThrow('Alert system offline');
      });
    });

    describe('getVehicleTrips', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockTrips: VehicleTrip[] = [
          {
            id: 'trip-1',
            vehicle_id: 'veh-1',
            start_time: '2024-04-01T09:00:00Z',
            end_time: '2024-04-01T17:00:00Z',
            start_location: 'Downtown Office',
            end_location: 'Airport',
            distance: 25.5,
            duration: 480,
            reservation_id: 'res-1'
          }
        ];
        mockClient.get.mockResolvedValue(mockTrips);

        const result = await getVehicleTrips('veh-1');

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/vehicles/veh-1/trips');
        expect(result).toEqual(mockTrips);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = {
          start_date: '2024-04-01',
          end_date: '2024-04-30'
        };
        const mockTrips: VehicleTrip[] = [];
        mockClient.get.mockResolvedValue(mockTrips);

        const result = await getVehicleTrips('veh-1', params);

        expect(mockClient.get).toHaveBeenCalledWith('/fleets/telematics/vehicles/veh-1/trips?start_date=2024-04-01&end_date=2024-04-30');
        expect(result).toEqual(mockTrips);
      });

      it('should propagate client errors', async () => {
        const error = new Error('Trip data unavailable');
        mockClient.get.mockRejectedValue(error);

        await expect(getVehicleTrips('veh-1')).rejects.toThrow('Trip data unavailable');
      });
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      // Vehicle operations
      expect(fleetAPI).toHaveProperty('listVehicles');
      expect(fleetAPI).toHaveProperty('getVehicle');
      expect(fleetAPI).toHaveProperty('updateVehicle');
      expect(fleetAPI).toHaveProperty('reserveVehicle');
      expect(fleetAPI).toHaveProperty('cancelReservation');
      expect(fleetAPI).toHaveProperty('getMaintenanceHistory');
      
      // Models & Types
      expect(fleetAPI).toHaveProperty('listVehicleModels');
      expect(fleetAPI).toHaveProperty('getVehicleModel');
      expect(fleetAPI).toHaveProperty('listVehicleTypes');
      expect(fleetAPI).toHaveProperty('getVehicleType');
      expect(fleetAPI).toHaveProperty('listVehicleBrands');
      expect(fleetAPI).toHaveProperty('getVehicleBrand');
      
      // Damages
      expect(fleetAPI).toHaveProperty('listVehicleDamages');
      expect(fleetAPI).toHaveProperty('createVehicleDamage');
      expect(fleetAPI).toHaveProperty('getVehicleDamage');
      expect(fleetAPI).toHaveProperty('updateVehicleDamage');
      
      // Blocked Periods
      expect(fleetAPI).toHaveProperty('listBlockedPeriods');
      expect(fleetAPI).toHaveProperty('createBlockedPeriod');
      expect(fleetAPI).toHaveProperty('updateBlockedPeriod');
      expect(fleetAPI).toHaveProperty('deleteBlockedPeriod');
      
      // Relocations
      expect(fleetAPI).toHaveProperty('listRelocations');
      expect(fleetAPI).toHaveProperty('createRelocation');
      expect(fleetAPI).toHaveProperty('deleteRelocation');
      
      // Telematics
      expect(fleetAPI).toHaveProperty('getVehicleOBDHistory');
      expect(fleetAPI).toHaveProperty('getAllOBDHistory');
      expect(fleetAPI).toHaveProperty('getVehicleAlerts');
      expect(fleetAPI).toHaveProperty('getVehicleTrips');
    });

    it('should have all functions be the same as named exports', () => {
      // Vehicle operations
      expect(fleetAPI.listVehicles).toBe(listVehicles);
      expect(fleetAPI.getVehicle).toBe(getVehicle);
      expect(fleetAPI.updateVehicle).toBe(updateVehicle);
      expect(fleetAPI.reserveVehicle).toBe(reserveVehicle);
      expect(fleetAPI.cancelReservation).toBe(cancelReservation);
      expect(fleetAPI.getMaintenanceHistory).toBe(getMaintenanceHistory);
      
      // Models & Types
      expect(fleetAPI.listVehicleModels).toBe(listVehicleModels);
      expect(fleetAPI.getVehicleModel).toBe(getVehicleModel);
      expect(fleetAPI.listVehicleTypes).toBe(listVehicleTypes);
      expect(fleetAPI.getVehicleType).toBe(getVehicleType);
      expect(fleetAPI.listVehicleBrands).toBe(listVehicleBrands);
      expect(fleetAPI.getVehicleBrand).toBe(getVehicleBrand);
      
      // Damages
      expect(fleetAPI.listVehicleDamages).toBe(listVehicleDamages);
      expect(fleetAPI.createVehicleDamage).toBe(createVehicleDamage);
      expect(fleetAPI.getVehicleDamage).toBe(getVehicleDamage);
      expect(fleetAPI.updateVehicleDamage).toBe(updateVehicleDamage);
      
      // Blocked Periods
      expect(fleetAPI.listBlockedPeriods).toBe(listBlockedPeriods);
      expect(fleetAPI.createBlockedPeriod).toBe(createBlockedPeriod);
      expect(fleetAPI.updateBlockedPeriod).toBe(updateBlockedPeriod);
      expect(fleetAPI.deleteBlockedPeriod).toBe(deleteBlockedPeriod);
      
      // Relocations
      expect(fleetAPI.listRelocations).toBe(listRelocations);
      expect(fleetAPI.createRelocation).toBe(createRelocation);
      expect(fleetAPI.deleteRelocation).toBe(deleteRelocation);
      
      // Telematics
      expect(fleetAPI.getVehicleOBDHistory).toBe(getVehicleOBDHistory);
      expect(fleetAPI.getAllOBDHistory).toBe(getAllOBDHistory);
      expect(fleetAPI.getVehicleAlerts).toBe(getVehicleAlerts);
      expect(fleetAPI.getVehicleTrips).toBe(getVehicleTrips);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from vehicle operations', async () => {
      const error = new Error('API Error');
      mockClient.get.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);

      await expect(listVehicles()).rejects.toThrow('API Error');
      await expect(getVehicle('veh-1')).rejects.toThrow('API Error');
      await expect(updateVehicle('veh-1', {})).rejects.toThrow('API Error');
      await expect(reserveVehicle('veh-1', {})).rejects.toThrow('API Error');
      await expect(cancelReservation('veh-1')).rejects.toThrow('API Error');
      await expect(getMaintenanceHistory('veh-1')).rejects.toThrow('API Error');
    });

    it('should propagate errors from model and type operations', async () => {
      const error = new Error('Service Error');
      mockClient.get.mockRejectedValue(error);

      await expect(listVehicleModels()).rejects.toThrow('Service Error');
      await expect(getVehicleModel('model-1')).rejects.toThrow('Service Error');
      await expect(listVehicleTypes()).rejects.toThrow('Service Error');
      await expect(getVehicleType('type-1')).rejects.toThrow('Service Error');
      await expect(listVehicleBrands()).rejects.toThrow('Service Error');
      await expect(getVehicleBrand('brand-1')).rejects.toThrow('Service Error');
    });

    it('should propagate errors from damage operations', async () => {
      const error = new Error('Database Error');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);

      await expect(listVehicleDamages('veh-1')).rejects.toThrow('Database Error');
      await expect(createVehicleDamage({})).rejects.toThrow('Database Error');
      await expect(getVehicleDamage('damage-1')).rejects.toThrow('Database Error');
      await expect(updateVehicleDamage('damage-1', {})).rejects.toThrow('Database Error');
    });

    it('should propagate errors from blocked period operations', async () => {
      const error = new Error('Validation Error');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(listBlockedPeriods('veh-1')).rejects.toThrow('Validation Error');
      await expect(createBlockedPeriod({})).rejects.toThrow('Validation Error');
      await expect(updateBlockedPeriod('block-1', {})).rejects.toThrow('Validation Error');
      await expect(deleteBlockedPeriod('block-1')).rejects.toThrow('Validation Error');
    });

    it('should propagate errors from relocation operations', async () => {
      const error = new Error('Permission Error');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(listRelocations()).rejects.toThrow('Permission Error');
      await expect(createRelocation({})).rejects.toThrow('Permission Error');
      await expect(deleteRelocation('reloc-1')).rejects.toThrow('Permission Error');
    });

    it('should propagate errors from telematics operations', async () => {
      const error = new Error('Connection Error');
      mockClient.get.mockRejectedValue(error);

      await expect(getVehicleOBDHistory('veh-1')).rejects.toThrow('Connection Error');
      await expect(getAllOBDHistory()).rejects.toThrow('Connection Error');
      await expect(getVehicleAlerts('veh-1')).rejects.toThrow('Connection Error');
      await expect(getVehicleTrips('veh-1')).rejects.toThrow('Connection Error');
    });
  });
});