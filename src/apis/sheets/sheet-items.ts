import client from '../../client';

export interface SheetItem {
  id?: string;
  sheet_id: string;
  name: string;
  description?: string;
  data?: any;
  position?: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  category?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  custom_fields?: any;
}

export interface CreateSheetItemPayload {
  name: string;
  description?: string;
  data?: any;
  position?: number;
  active?: boolean;
  category?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  custom_fields?: any;
}

export interface UpdateSheetItemPayload {
  name?: string;
  description?: string;
  data?: any;
  position?: number;
  active?: boolean;
  category?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  custom_fields?: any;
}

/**
 * Show a list of all items for specific sheet
 */
export const listSheetItems = async (
  sheetId: string,
  params?: Record<string, any>,
): Promise<SheetItem[]> => {
  if (params) {
    const query = new URLSearchParams(params).toString();
    return client.get<SheetItem[]>(`/sheets/${sheetId}/items?${query}`);
  }
  return client.get<SheetItem[]>(`/sheets/${sheetId}/items`);
};

/**
 * Show details of sheet item
 */
export const getSheetItem = async (sheetId: string, itemId: string): Promise<SheetItem> =>
  client.get<SheetItem>(`/sheets/${sheetId}/items/${itemId}`);

/**
 * Update sheet item in the application
 */
export const updateSheetItem = async (
  sheetId: string,
  itemId: string,
  itemData: UpdateSheetItemPayload,
): Promise<SheetItem> => client.put<SheetItem>(`/sheets/${sheetId}/items/${itemId}`, itemData);

/**
 * Create a new sheet item in the application
 */
export const createSheetItem = async (
  sheetId: string,
  itemData: CreateSheetItemPayload,
): Promise<SheetItem> => client.post<SheetItem>(`/sheets/${sheetId}/items`, itemData);

export default {
  listSheetItems,
  getSheetItem,
  updateSheetItem,
  createSheetItem,
};
