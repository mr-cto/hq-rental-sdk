import client from '../../client';

export interface Sheet {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  item_count?: number;
}

export interface SheetItem {
  id: string;
  sheet_id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  custom_fields?: Record<string, any>;
}

export interface CreateSheetItemPayload {
  name: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  active?: boolean;
  custom_fields?: Record<string, any>;
}

export interface UpdateSheetItemPayload extends Partial<CreateSheetItemPayload> {}

// Sheet Management
export const listSheets = async (params?: Record<string, any>): Promise<Sheet[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<Sheet[]>(`/sheets${query}`);
};

// Sheet Items Management
export const listSheetItems = async (sheetId: string, params?: Record<string, any>): Promise<SheetItem[]> => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<SheetItem[]>(`/sheets/${sheetId}/items${query}`);
};

export const getSheetItem = async (sheetId: string, itemId: string): Promise<SheetItem> =>
  client.get<SheetItem>(`/sheets/${sheetId}/items/${itemId}`);

export const createSheetItem = async (sheetId: string, payload: CreateSheetItemPayload): Promise<SheetItem> =>
  client.post<SheetItem>(`/sheets/${sheetId}/items`, payload);

export const updateSheetItem = async (sheetId: string, itemId: string, payload: UpdateSheetItemPayload): Promise<SheetItem> =>
  client.put<SheetItem>(`/sheets/${sheetId}/items/${itemId}`, payload);

export default {
  // Sheet Management
  listSheets,
  
  // Sheet Items Management
  listSheetItems,
  getSheetItem,
  createSheetItem,
  updateSheetItem,
};