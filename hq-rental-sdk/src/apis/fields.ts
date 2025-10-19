import client from '../client';

export interface Field {
  id: string;
  name: string;
  type: string;
  required: boolean;
  options?: string[];
  item_type?: string;
}

export const listFieldsByItemType = async (itemType: string): Promise<Field[]> =>
  client.get<Field[]>(`/car-rental/fields?item_type=${itemType}`);

export const getField = async (fieldId: string): Promise<Field> =>
  client.get<Field>(`/car-rental/fields/${fieldId}`);

export const getFieldByType = async (fieldType: string): Promise<Field> =>
  client.get<Field>(`/car-rental/fields/type/${fieldType}`);

export const listCustomerFields = async (): Promise<Field[]> =>
  client.get<Field[]>('/car-rental/fields/customers');

export default {
  listFieldsByItemType,
  getField,
  getFieldByType,
  listCustomerFields,
};