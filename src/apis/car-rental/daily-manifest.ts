import client from '../../client';

export interface DailyManifest {
  date: string;
  location?: string;
  reservations: any[];
  vehicles: any[];
  summary: {
    total_reservations: number;
    active_rentals: number;
    pending_returns: number;
    available_vehicles: number;
  };
}

// Daily Manifest
export const getDailyManifest = async (params?: { date?: string; location?: string }): Promise<DailyManifest> => {
  const query = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
  return client.get<DailyManifest>(`/car-rental/daily-manifest${query}`);
};

export default {
  getDailyManifest,
};