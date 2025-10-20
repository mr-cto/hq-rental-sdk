import client from '../../client';

export interface RateType {
  id: string;
  name: string;
  description?: string;
  multiplier: number;
  is_default?: boolean;
}

export interface Rate {
  id: string;
  name: string;
  vehicle_class_id?: string;
  rate_type_id: string;
  base_rate: number;
  hourly_rate?: number;
  daily_rate?: number;
  weekly_rate?: number;
  monthly_rate?: number;
  mileage_rate?: number;
  minimum_charge?: number;
  season_id?: string;
  effective_from: string;
  effective_to?: string;
}

export interface Season {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  multiplier: number;
  description?: string;
}

export interface SecurityDeposit {
  id: string;
  customer_id: string;
  reservation_id?: string;
  amount: number;
  status: 'pending' | 'held' | 'released' | 'forfeited';
  payment_method?: string;
  held_date?: string;
  released_date?: string;
  notes?: string;
}

// Rate Types
export const listRateTypes = async (): Promise<RateType[]> =>
  client.get<RateType[]>('/car-rental/rate-types');

export const createRateType = async (payload: Partial<RateType>): Promise<RateType> =>
  client.post<RateType>('/car-rental/rate-types', payload);

export const getRateType = async (rateTypeId: string): Promise<RateType> =>
  client.get<RateType>(`/car-rental/rate-types/${rateTypeId}`);

export const updateRateType = async (
  rateTypeId: string,
  payload: Partial<RateType>,
): Promise<RateType> => client.put<RateType>(`/car-rental/rate-types/${rateTypeId}`, payload);

export const deleteRateType = async (rateTypeId: string): Promise<void> =>
  client.delete<void>(`/car-rental/rate-types/${rateTypeId}`);

// Rates
export const listRates = async (): Promise<Rate[]> => client.get<Rate[]>('/car-rental/rates');

export const createRate = async (payload: Partial<Rate>): Promise<Rate> =>
  client.post<Rate>('/car-rental/rates', payload);

export const getRate = async (rateId: string): Promise<Rate> =>
  client.get<Rate>(`/car-rental/rates/${rateId}`);

export const updateRate = async (rateId: string, payload: Partial<Rate>): Promise<Rate> =>
  client.put<Rate>(`/car-rental/rates/${rateId}`, payload);

export const deleteRate = async (rateId: string): Promise<void> =>
  client.delete<void>(`/car-rental/rates/${rateId}`);

// Rates V2
export const listRatesV2 = async (params?: Record<string, any>): Promise<Rate[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<Rate[]>(`/car-rental/rates/v2${query}`);
};

// Seasons
export const listSeasons = async (): Promise<Season[]> =>
  client.get<Season[]>('/car-rental/seasons');

export const createSeason = async (payload: Partial<Season>): Promise<Season> =>
  client.post<Season>('/car-rental/seasons', payload);

export const getSeason = async (seasonId: string): Promise<Season> =>
  client.get<Season>(`/car-rental/seasons/${seasonId}`);

export const updateSeason = async (seasonId: string, payload: Partial<Season>): Promise<Season> =>
  client.put<Season>(`/car-rental/seasons/${seasonId}`, payload);

export const deleteSeason = async (seasonId: string): Promise<void> =>
  client.delete<void>(`/car-rental/seasons/${seasonId}`);

// Security Deposits
export const listSecurityDeposits = async (
  params?: Record<string, any>,
): Promise<SecurityDeposit[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<SecurityDeposit[]>(`/car-rental/security-deposits${query}`);
};

export const getSecurityDeposit = async (depositId: string): Promise<SecurityDeposit> =>
  client.get<SecurityDeposit>(`/car-rental/security-deposits/${depositId}`);

export default {
  // Rate Types
  listRateTypes,
  createRateType,
  getRateType,
  updateRateType,
  deleteRateType,

  // Rates
  listRates,
  createRate,
  getRate,
  updateRate,
  deleteRate,
  listRatesV2,

  // Seasons
  listSeasons,
  createSeason,
  getSeason,
  updateSeason,
  deleteSeason,

  // Security Deposits
  listSecurityDeposits,
  getSecurityDeposit,
};
