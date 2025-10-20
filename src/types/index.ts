// Base types
export type Rental = {
  id: string;
  customerId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'canceled';
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

export type InventoryItem = {
  id: string;
  type: string;
  status: 'available' | 'rented' | 'maintenance';
  details?: string;
};

// Additional types for comprehensive API coverage
export type Comment = {
  id: string;
  item_id?: string;
  reservation_id?: string;  
  content: string;
  author: string;
  created_at: string;
  updated_at?: string;
};

export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  type?: string;
};

export type Address = {
  id: string;
  street: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
  created_at?: string;
  updated_at?: string;
};

export type Currency = {
  id: string;
  code: string;
  name: string;
  symbol: string;
  exchange_rate?: number;
};

export type Field = {
  id: string;
  name: string;
  type: string;
  required: boolean;
  options?: string[];
  item_type?: string;
};

export type BlockedDay = {
  id: string;
  date: string;
  reason: string;
  location_id?: string;
  vehicle_id?: string;
};

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  vin?: string;
  status: 'available' | 'rented' | 'maintenance' | 'out_of_service';
  location_id?: string;
  vehicle_type_id?: string;
  vehicle_model_id?: string;
  mileage?: number;
  created_at?: string;
  updated_at?: string;
};

export type Payment = {
  id: string;
  reservation_id: string;
  amount: number;
  payment_method: string;
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_date: string;
  notes?: string;
};

export type Fine = {
  id: string;
  reservation_id?: string;
  customer_id?: string;
  vehicle_id?: string;
  type: string;
  description: string;
  amount: number;
  status: 'pending' | 'paid' | 'disputed' | 'cancelled';
  issued_date: string;
  due_date?: string;
  paid_date?: string;
};

export type Quote = {
  id: string;
  customer_id?: string;
  vehicle_class?: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: 'active' | 'expired' | 'converted';
  expires_at: string;
  created_at: string;
};

export type Adjustment = {
  id: string;
  reservation_id: string;
  type: 'discount' | 'fee' | 'tax' | 'other';
  description: string;
  amount: number;
  created_at: string;
};

export type Refund = {
  id: string;
  reservation_id: string;
  amount: number;
  reason: string;
  status: 'pending' | 'processed' | 'failed';
  refund_date?: string;
  processed_date?: string;
};

export type VehicleReplacement = {
  id: string;
  reservation_id: string;
  original_vehicle_id: string;
  replacement_vehicle_id: string;
  reason: string;
  additional_cost?: number;
  replaced_at: string;
};

export type ReservationAgent = {
  id: string;
  name: string;
  email: string;
  role: 'pickup' | 'return' | 'both';
  location_id?: string;
};

export type ExternalCharge = {
  id: string;
  reservation_id: string;
  description: string;
  amount: number;
  charge_date: string;
  category?: string;
};

// API Response wrapper types
export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
};