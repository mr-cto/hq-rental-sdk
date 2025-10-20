import client from '../../client';

export interface SecurityDeposit {
  id: string;
  name: string;
  amount: number;
  currency: string;
  vehicle_type_id?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

// Security Deposits
export const listSecurityDeposits = async (
  params?: Record<string, any>,
): Promise<SecurityDeposit[]> => {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  return client.get<SecurityDeposit[]>(`/car-rental/security-deposits${queryString}`);
};

export const getSecurityDeposit = async (depositId: string): Promise<SecurityDeposit> =>
  client.get<SecurityDeposit>(`/car-rental/security-deposits/${depositId}`);

export default {
  listSecurityDeposits,
  getSecurityDeposit,
};
