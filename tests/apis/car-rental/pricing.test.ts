import * as pricingAPI from '../../../src/apis/car-rental/pricing';
import type { RateType, Rate, Season, SecurityDeposit } from '../../../src/apis/car-rental/pricing';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = require('../../../src/client');

describe('Pricing API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rate Types', () => {
    describe('listRateTypes', () => {
      it('should call client.get with correct URL', async () => {
        const mockRateTypes: RateType[] = [
          {
            id: 'rate-type-1',
            name: 'Standard Rate',
            description: 'Standard hourly rate',
            multiplier: 1.0,
            is_default: true,
          },
        ];
        mockClient.get.mockResolvedValue(mockRateTypes);

        const result = await pricingAPI.listRateTypes();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/rate-types');
        expect(result).toEqual(mockRateTypes);
      });

      it('should handle empty rate types list', async () => {
        mockClient.get.mockResolvedValue([]);

        const result = await pricingAPI.listRateTypes();

        expect(result).toEqual([]);
      });
    });

    describe('createRateType', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<RateType> = {
          name: 'Premium Rate',
          description: 'Premium service rate',
          multiplier: 1.5,
        };
        const mockRateType: RateType = {
          ...(payload as RateType),
          id: 'rate-type-new',
        };
        mockClient.post.mockResolvedValue(mockRateType);

        const result = await pricingAPI.createRateType(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/rate-types', payload);
        expect(result).toEqual(mockRateType);
      });

      it('should handle minimal rate type payload', async () => {
        const payload: Partial<RateType> = {
          name: 'Basic Rate',
          multiplier: 1.0,
        };
        mockClient.post.mockResolvedValue({ id: 'rate-type-basic', ...payload });

        await pricingAPI.createRateType(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/rate-types', payload);
      });
    });

    describe('getRateType', () => {
      it('should call client.get with correct URL', async () => {
        const mockRateType: RateType = {
          id: 'rate-type-1',
          name: 'Discount Rate',
          multiplier: 0.8,
          is_default: false,
        };
        mockClient.get.mockResolvedValue(mockRateType);

        const result = await pricingAPI.getRateType('rate-type-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/rate-types/rate-type-1');
        expect(result).toEqual(mockRateType);
      });

      it('should handle special characters in rate type ID', async () => {
        mockClient.get.mockResolvedValue({ id: 'rate@special' });

        await pricingAPI.getRateType('rate@special');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/rate-types/rate@special');
      });
    });

    describe('updateRateType', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<RateType> = {
          name: 'Updated Rate',
          multiplier: 1.2,
        };
        const mockRateType: RateType = {
          ...(payload as RateType),
          id: 'rate-type-1',
        };
        mockClient.put.mockResolvedValue(mockRateType);

        const result = await pricingAPI.updateRateType('rate-type-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/rate-types/rate-type-1', payload);
        expect(result).toEqual(mockRateType);
      });
    });

    describe('deleteRateType', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await pricingAPI.deleteRateType('rate-type-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/rate-types/rate-type-1');
      });
    });
  });

  describe('Rates', () => {
    describe('listRates', () => {
      it('should call client.get with correct URL', async () => {
        const mockRates: Rate[] = [
          {
            id: 'rate-1',
            name: 'Economy Rate',
            vehicle_class_id: 'class-economy',
            rate_type_id: 'rate-type-1',
            base_rate: 25.0,
            hourly_rate: 15.0,
            daily_rate: 89.99,
            weekly_rate: 450.0,
            effective_from: '2024-01-01',
          },
        ];
        mockClient.get.mockResolvedValue(mockRates);

        const result = await pricingAPI.listRates();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/rates');
        expect(result).toEqual(mockRates);
      });
    });

    describe('createRate', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<Rate> = {
          name: 'Luxury Rate',
          vehicle_class_id: 'class-luxury',
          rate_type_id: 'rate-type-premium',
          base_rate: 75.0,
          daily_rate: 199.99,
          effective_from: '2024-04-01',
        };
        const mockRate: Rate = {
          ...(payload as Rate),
          id: 'rate-new',
        };
        mockClient.post.mockResolvedValue(mockRate);

        const result = await pricingAPI.createRate(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/rates', payload);
        expect(result).toEqual(mockRate);
      });
    });

    describe('getRate', () => {
      it('should call client.get with correct URL', async () => {
        const mockRate: Rate = {
          id: 'rate-1',
          name: 'SUV Rate',
          rate_type_id: 'rate-type-1',
          base_rate: 50.0,
          effective_from: '2024-01-01',
        };
        mockClient.get.mockResolvedValue(mockRate);

        const result = await pricingAPI.getRate('rate-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/rates/rate-1');
        expect(result).toEqual(mockRate);
      });
    });

    describe('updateRate', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<Rate> = {
          daily_rate: 109.99,
          weekly_rate: 550.0,
        };
        mockClient.put.mockResolvedValue({ id: 'rate-1', ...payload });

        await pricingAPI.updateRate('rate-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/rates/rate-1', payload);
      });
    });

    describe('deleteRate', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await pricingAPI.deleteRate('rate-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/rates/rate-1');
      });
    });

    describe('listRatesV2', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockRates: Rate[] = [
          {
            id: 'rate-v2-1',
            name: 'V2 Rate',
            rate_type_id: 'rate-type-1',
            base_rate: 30.0,
            effective_from: '2024-01-01',
          },
        ];
        mockClient.get.mockResolvedValue(mockRates);

        const result = await pricingAPI.listRatesV2();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/rates/v2');
        expect(result).toEqual(mockRates);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { vehicle_class: 'economy', active: 'true' };
        mockClient.get.mockResolvedValue([]);

        await pricingAPI.listRatesV2(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/car-rental/rates/v2?vehicle_class=economy&active=true',
        );
      });

      it('should handle empty params object', async () => {
        mockClient.get.mockResolvedValue([]);

        await pricingAPI.listRatesV2({});

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/rates/v2?');
      });
    });
  });

  describe('Seasons', () => {
    describe('listSeasons', () => {
      it('should call client.get with correct URL', async () => {
        const mockSeasons: Season[] = [
          {
            id: 'season-1',
            name: 'Summer Peak',
            start_date: '2024-06-01',
            end_date: '2024-08-31',
            multiplier: 1.3,
            description: 'Peak summer season pricing',
          },
        ];
        mockClient.get.mockResolvedValue(mockSeasons);

        const result = await pricingAPI.listSeasons();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/seasons');
        expect(result).toEqual(mockSeasons);
      });
    });

    describe('createSeason', () => {
      it('should call client.post with correct URL and payload', async () => {
        const payload: Partial<Season> = {
          name: 'Winter Off-Season',
          start_date: '2024-12-01',
          end_date: '2024-02-28',
          multiplier: 0.8,
          description: 'Discounted winter rates',
        };
        const mockSeason: Season = {
          ...(payload as Season),
          id: 'season-new',
        };
        mockClient.post.mockResolvedValue(mockSeason);

        const result = await pricingAPI.createSeason(payload);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/seasons', payload);
        expect(result).toEqual(mockSeason);
      });
    });

    describe('getSeason', () => {
      it('should call client.get with correct URL', async () => {
        const mockSeason: Season = {
          id: 'season-1',
          name: 'Spring',
          start_date: '2024-03-01',
          end_date: '2024-05-31',
          multiplier: 1.1,
        };
        mockClient.get.mockResolvedValue(mockSeason);

        const result = await pricingAPI.getSeason('season-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/seasons/season-1');
        expect(result).toEqual(mockSeason);
      });
    });

    describe('updateSeason', () => {
      it('should call client.put with correct URL and payload', async () => {
        const payload: Partial<Season> = {
          multiplier: 1.15,
          description: 'Updated spring pricing',
        };
        mockClient.put.mockResolvedValue({ id: 'season-1', ...payload });

        await pricingAPI.updateSeason('season-1', payload);

        expect(mockClient.put).toHaveBeenCalledWith('/car-rental/seasons/season-1', payload);
      });
    });

    describe('deleteSeason', () => {
      it('should call client.delete with correct URL', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await pricingAPI.deleteSeason('season-1');

        expect(mockClient.delete).toHaveBeenCalledWith('/car-rental/seasons/season-1');
      });
    });
  });

  describe('Security Deposits', () => {
    describe('listSecurityDeposits', () => {
      it('should call client.get with correct URL without params', async () => {
        const mockDeposits: SecurityDeposit[] = [
          {
            id: 'deposit-1',
            customer_id: 'cust-1',
            reservation_id: 'res-1',
            amount: 500.0,
            status: 'held',
            payment_method: 'credit_card',
            held_date: '2024-01-01T10:00:00Z',
          },
        ];
        mockClient.get.mockResolvedValue(mockDeposits);

        const result = await pricingAPI.listSecurityDeposits();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/security-deposits');
        expect(result).toEqual(mockDeposits);
      });

      it('should call client.get with correct URL with params', async () => {
        const params = { customer_id: 'cust-1', status: 'held' };
        mockClient.get.mockResolvedValue([]);

        await pricingAPI.listSecurityDeposits(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          '/car-rental/security-deposits?customer_id=cust-1&status=held',
        );
      });

      it('should handle empty deposits list', async () => {
        mockClient.get.mockResolvedValue([]);

        const result = await pricingAPI.listSecurityDeposits();

        expect(result).toEqual([]);
      });
    });

    describe('getSecurityDeposit', () => {
      it('should call client.get with correct URL', async () => {
        const mockDeposit: SecurityDeposit = {
          id: 'deposit-1',
          customer_id: 'cust-1',
          amount: 300.0,
          status: 'released',
          held_date: '2024-01-01T10:00:00Z',
          released_date: '2024-01-07T15:30:00Z',
          notes: 'Deposit released after vehicle inspection',
        };
        mockClient.get.mockResolvedValue(mockDeposit);

        const result = await pricingAPI.getSecurityDeposit('deposit-1');

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/security-deposits/deposit-1');
        expect(result).toEqual(mockDeposit);
      });

      it('should handle special characters in deposit ID', async () => {
        mockClient.get.mockResolvedValue({ id: 'deposit@special' });

        await pricingAPI.getSecurityDeposit('deposit@special');

        expect(mockClient.get).toHaveBeenCalledWith(
          '/car-rental/security-deposits/deposit@special',
        );
      });
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      const defaultExport = require('../../../src/apis/car-rental/pricing').default;

      // Rate Types
      expect(defaultExport.listRateTypes).toBeDefined();
      expect(defaultExport.createRateType).toBeDefined();
      expect(defaultExport.getRateType).toBeDefined();
      expect(defaultExport.updateRateType).toBeDefined();
      expect(defaultExport.deleteRateType).toBeDefined();

      // Rates
      expect(defaultExport.listRates).toBeDefined();
      expect(defaultExport.createRate).toBeDefined();
      expect(defaultExport.getRate).toBeDefined();
      expect(defaultExport.updateRate).toBeDefined();
      expect(defaultExport.deleteRate).toBeDefined();
      expect(defaultExport.listRatesV2).toBeDefined();

      // Seasons
      expect(defaultExport.listSeasons).toBeDefined();
      expect(defaultExport.createSeason).toBeDefined();
      expect(defaultExport.getSeason).toBeDefined();
      expect(defaultExport.updateSeason).toBeDefined();
      expect(defaultExport.deleteSeason).toBeDefined();

      // Security Deposits
      expect(defaultExport.listSecurityDeposits).toBeDefined();
      expect(defaultExport.getSecurityDeposit).toBeDefined();
    });

    it('should have all functions be the same as named exports', () => {
      const defaultExport = require('../../../src/apis/car-rental/pricing').default;

      expect(defaultExport.listRateTypes).toBe(pricingAPI.listRateTypes);
      expect(defaultExport.createRateType).toBe(pricingAPI.createRateType);
      expect(defaultExport.getRateType).toBe(pricingAPI.getRateType);
      expect(defaultExport.updateRateType).toBe(pricingAPI.updateRateType);
      expect(defaultExport.deleteRateType).toBe(pricingAPI.deleteRateType);

      expect(defaultExport.listRates).toBe(pricingAPI.listRates);
      expect(defaultExport.createRate).toBe(pricingAPI.createRate);
      expect(defaultExport.getRate).toBe(pricingAPI.getRate);
      expect(defaultExport.updateRate).toBe(pricingAPI.updateRate);
      expect(defaultExport.deleteRate).toBe(pricingAPI.deleteRate);
      expect(defaultExport.listRatesV2).toBe(pricingAPI.listRatesV2);

      expect(defaultExport.listSeasons).toBe(pricingAPI.listSeasons);
      expect(defaultExport.createSeason).toBe(pricingAPI.createSeason);
      expect(defaultExport.getSeason).toBe(pricingAPI.getSeason);
      expect(defaultExport.updateSeason).toBe(pricingAPI.updateSeason);
      expect(defaultExport.deleteSeason).toBe(pricingAPI.deleteSeason);

      expect(defaultExport.listSecurityDeposits).toBe(pricingAPI.listSecurityDeposits);
      expect(defaultExport.getSecurityDeposit).toBe(pricingAPI.getSecurityDeposit);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from rate type operations', async () => {
      const error = new Error('Rate type operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(pricingAPI.listRateTypes()).rejects.toThrow('Rate type operation failed');
      await expect(pricingAPI.createRateType({})).rejects.toThrow('Rate type operation failed');
      await expect(pricingAPI.getRateType('rate-type-1')).rejects.toThrow(
        'Rate type operation failed',
      );
      await expect(pricingAPI.updateRateType('rate-type-1', {})).rejects.toThrow(
        'Rate type operation failed',
      );
      await expect(pricingAPI.deleteRateType('rate-type-1')).rejects.toThrow(
        'Rate type operation failed',
      );
    });

    it('should propagate errors from rate operations', async () => {
      const error = new Error('Rate operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(pricingAPI.listRates()).rejects.toThrow('Rate operation failed');
      await expect(pricingAPI.createRate({})).rejects.toThrow('Rate operation failed');
      await expect(pricingAPI.getRate('rate-1')).rejects.toThrow('Rate operation failed');
      await expect(pricingAPI.updateRate('rate-1', {})).rejects.toThrow('Rate operation failed');
      await expect(pricingAPI.deleteRate('rate-1')).rejects.toThrow('Rate operation failed');
      await expect(pricingAPI.listRatesV2()).rejects.toThrow('Rate operation failed');
    });

    it('should propagate errors from season operations', async () => {
      const error = new Error('Season operation failed');
      mockClient.get.mockRejectedValue(error);
      mockClient.post.mockRejectedValue(error);
      mockClient.put.mockRejectedValue(error);
      mockClient.delete.mockRejectedValue(error);

      await expect(pricingAPI.listSeasons()).rejects.toThrow('Season operation failed');
      await expect(pricingAPI.createSeason({})).rejects.toThrow('Season operation failed');
      await expect(pricingAPI.getSeason('season-1')).rejects.toThrow('Season operation failed');
      await expect(pricingAPI.updateSeason('season-1', {})).rejects.toThrow(
        'Season operation failed',
      );
      await expect(pricingAPI.deleteSeason('season-1')).rejects.toThrow('Season operation failed');
    });

    it('should propagate errors from security deposit operations', async () => {
      const error = new Error('Security deposit operation failed');
      mockClient.get.mockRejectedValue(error);

      await expect(pricingAPI.listSecurityDeposits()).rejects.toThrow(
        'Security deposit operation failed',
      );
      await expect(pricingAPI.getSecurityDeposit('deposit-1')).rejects.toThrow(
        'Security deposit operation failed',
      );
    });
  });
});
