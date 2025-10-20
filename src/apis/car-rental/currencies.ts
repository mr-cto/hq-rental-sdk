import client from '../../client';

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  exchange_rate?: number;
}

export const listCurrencies = async (): Promise<Currency[]> =>
  client.get<Currency[]>('/car-rental/currencies');

export default {
  listCurrencies,
};