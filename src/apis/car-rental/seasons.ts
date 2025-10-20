import client from '../../client';

export interface Season {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

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
  client.delete(`/car-rental/seasons/${seasonId}`);

export default {
  listSeasons,
  createSeason,
  getSeason,
  updateSeason,
  deleteSeason,
};
