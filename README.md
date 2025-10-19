# HQ Rental SDK

A comprehensive TypeScript SDK for the HQ Rental Software API, providing complete access to all endpoints including reservations, fleet management, payments, and more.

## Features

- 🚗 **Complete API Coverage**: All HQ Rental Software API endpoints implemented
- 🔐 **Authentication**: Built-in token management and authentication helpers
- 📝 **TypeScript Support**: Full type definitions for all API responses and requests
- 🛠️ **Modular Design**: Organized API modules for easy navigation and usage
- ⚡ **Modern Architecture**: Built with axios and modern TypeScript patterns
- 🔄 **Async/Await**: Promise-based API with full async/await support

## Installation

```bash
npm install hq-rental-sdk
```

## Quick Start

```typescript
import client, { auth, customers, rentals, fleet } from 'hq-rental-sdk';

// Set your API token
auth.setToken('your-api-token');

// Create a customer
const customer = await customers.createCustomer({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890'
});

// List reservations
const reservations = await rentals.listReservations({ limit: '10' });

// Get fleet vehicles
const vehicles = await fleet.listVehicles({ status: 'available' });
```

## API Modules

The SDK is organized into the following modules:

### Core APIs
- **`customers`** - Customer management (CRUD operations)
- **`rentals`** - Reservation management and status updates
- **`inventory`** - Inventory item management

### Fleet Management
- **`fleet`** - Vehicles, models, types, damages, maintenance
- **`fleetManagement`** - Additional charges, features, locations

### Financial & Pricing
- **`financial`** - Customer credits, fines, packages, quotes
- **`pricing`** - Rate types, rates, seasons, security deposits
- **`reservations`** - Payments, refunds, adjustments, extensions

### Communication & Content
- **`emails`** - Email templates and delivery
- **`comments`** - Comments for items and reservations
- **`addresses`** - Address management

### System & Configuration
- **`system`** - Webhooks, preferences, contacts, payment gateways
- **`currencies`** - Currency management
- **`fields`** - Custom field definitions
- **`blockedDays`** - Blocked day management

## Authentication

Set your API token before making requests:

```typescript
import { auth } from 'hq-rental-sdk';

// Set token
auth.setToken('your-api-token');

// Or use API key alias
auth.useApiKey('your-api-key');

// Clear token
auth.setToken(null);
```

## Environment Variables

You can set the base URL via environment variable:

```bash
export HQ_API_BASE_URL=https://your-instance.hqrentalsoftware.com
```

## Examples

### Customer Management

```typescript
import { customers } from 'hq-rental-sdk';

// List customers with pagination
const customerList = await customers.listCustomers({ 
  page: '1', 
  limit: '20' 
});

// Get a specific customer
const customer = await customers.getCustomer('customer-id');

// Create a new customer
const newCustomer = await customers.createCustomer({
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+1987654321'
});

// Update customer
const updatedCustomer = await customers.updateCustomer('customer-id', {
  phone: '+1555000000'
});

// Delete customer
await customers.deleteCustomer('customer-id');
```

### Reservation Management

```typescript
import { rentals } from 'hq-rental-sdk';

// List reservations
const reservations = await rentals.listReservations();

// Get specific reservation
const reservation = await rentals.findReservation('reservation-id');

// Create reservation
const newReservation = await rentals.createReservation({
  customerId: 'customer-id',
  vehicleId: 'vehicle-id',
  startDate: '2024-01-01',
  endDate: '2024-01-07'
});

// Update reservation status
await rentals.setReservationOpen('reservation-id');
await rentals.setReservationCancel('reservation-id');
await rentals.setReservationPending('reservation-id');
```

### Fleet Management

```typescript
import { fleet } from 'hq-rental-sdk';

// List vehicles
const vehicles = await fleet.listVehicles({ 
  status: 'available',
  location_id: 'location-1' 
});

// Get vehicle details
const vehicle = await fleet.getVehicle('vehicle-id');

// List vehicle damages
const damages = await fleet.listVehicleDamages('vehicle-id');

// Create blocked period
const blockedPeriod = await fleet.createBlockedPeriod({
  vehicle_id: 'vehicle-id',
  start_date: '2024-01-01',
  end_date: '2024-01-07',
  reason: 'Maintenance'
});
```

### Payment Processing

```typescript
import { reservations, financial } from 'hq-rental-sdk';

// List reservation payments
const payments = await reservations.listReservationPayments('reservation-id');

// Create payment
const payment = await reservations.createReservationPayment('reservation-id', {
  amount: 100.00,
  payment_method: 'credit_card',
  transaction_id: 'txn-123'
});

// Create refund
const refund = await reservations.createReservationRefund('reservation-id', {
  amount: 50.00,
  reason: 'Customer cancellation'
});

// List customer fines
const fines = await financial.listFines({ customer_id: 'customer-id' });
```

## Error Handling

The SDK uses standard HTTP status codes and returns detailed error information:

```typescript
try {
  const customer = await customers.getCustomer('invalid-id');
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.log('Status:', error.response.status);
    console.log('Data:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.log('No response:', error.request);
  } else {
    // Something else happened
    console.log('Error:', error.message);
  }
}
```

## TypeScript Support

The SDK includes comprehensive TypeScript definitions:

```typescript
import { Customer, Vehicle, Payment } from 'hq-rental-sdk/types';

const customer: Customer = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
};

const vehicle: Vehicle = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2023,
  license_plate: 'ABC123',
  status: 'available'
};
```

## Configuration

```typescript
import { API_BASE_URL, DEFAULT_HEADERS } from 'hq-rental-sdk/config';

console.log('Base URL:', API_BASE_URL);
console.log('Default headers:', DEFAULT_HEADERS);
```

## License

MIT License

## Support

For issues and support, please refer to the [HQ Rental Software API documentation](https://api-docs.hqrentalsoftware.com/) or contact support.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.