# HQ Rental SDK

A comprehensive TypeScript SDK for the HQ Rental Software API, providing complete access to all endpoints including reservations, fleet management, payments, and more.

## Features

- 🚗 **Complete API Coverage**: All HQ Rental Software API endpoints implemented
- 🔐 **Authentication**: Built-in token management and authentication helpers
- 📝 **TypeScript Support**: Full type definitions for all API responses and requests
- 🛠️ **Modular Design**: Organized API modules for easy navigation and usage
- ⚡ **Modern Architecture**: Built with axios and modern TypeScript patterns
- 🔄 **Async/Await**: Promise-based API with full async/await support
- ✅ **100% Test Coverage**: Complete unit test coverage across all functions, statements, branches, and lines
- 🧪 **Comprehensive Testing**: 728+ unit tests covering all API endpoints and edge cases

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
  phone: '+1234567890',
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
  limit: '20',
});

// Get a specific customer
const customer = await customers.getCustomer('customer-id');

// Create a new customer
const newCustomer = await customers.createCustomer({
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+1987654321',
});

// Update customer
const updatedCustomer = await customers.updateCustomer('customer-id', {
  phone: '+1555000000',
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
  endDate: '2024-01-07',
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
  location_id: 'location-1',
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
  reason: 'Maintenance',
});
```

### Payment Processing

```typescript
import { reservations, financial } from 'hq-rental-sdk';

// List reservation payments
const payments = await reservations.listReservationPayments('reservation-id');

// Create payment
const payment = await reservations.createReservationPayment('reservation-id', {
  amount: 100.0,
  payment_method: 'credit_card',
  transaction_id: 'txn-123',
});

// Create refund
const refund = await reservations.createReservationRefund('reservation-id', {
  amount: 50.0,
  reason: 'Customer cancellation',
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
  email: 'john@example.com',
};

const vehicle: Vehicle = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2023,
  license_plate: 'ABC123',
  status: 'available',
};
```

## Configuration

```typescript
import { API_BASE_URL, DEFAULT_HEADERS } from 'hq-rental-sdk/config';

console.log('Base URL:', API_BASE_URL);
console.log('Default headers:', DEFAULT_HEADERS);
```

## Testing & Quality

This SDK maintains **100% test coverage** across all metrics:

- **Functions**: 100% (339/339)
- **Statements**: 100% (1140/1140)
- **Branches**: 100% (67/67)
- **Lines**: 100% (824/824)

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test tests/customers.test.ts

# Run tests in watch mode
npm run test:watch
```

### Test Structure

Tests are organized by module and cover:

- ✅ All API endpoint functions
- ✅ Error handling and edge cases
- ✅ Type validation and TypeScript compliance
- ✅ Authentication flows
- ✅ HTTP client behavior
- ✅ Model validation and utilities

## Contributing

We welcome contributions to the HQ Rental SDK! This project maintains high quality standards with 100% test coverage, and we'd love your help in keeping it that way.

### 🚀 Quick Start for Contributors

1. **Fork & Clone**

   ```bash
   git clone https://github.com/mr-cto/hq-rental-sdk.git
   cd hq-rental-sdk
   npm install
   ```

2. **Run Tests**

   ```bash
   npm test  # Ensure everything works
   npm run test:coverage  # Verify 100% coverage
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-amazing-feature
   ```

### 📋 Contribution Guidelines

#### Code Quality Standards

- **✅ 100% Test Coverage**: All new code must include comprehensive tests
- **✅ TypeScript First**: Use strict typing, avoid `any` types
- **✅ Consistent Patterns**: Follow existing architectural patterns
- **✅ Documentation**: Include JSDoc comments for public APIs

#### What We're Looking For

**🔧 API Enhancements**

- New HQ Rental API endpoint integrations
- Enhanced error handling and validation
- Performance optimizations

**📚 Documentation Improvements**

- Better examples and use cases
- API documentation enhancements
- Tutorial content

**🐛 Bug Fixes**

- Error handling improvements
- Edge case handling
- Browser compatibility fixes

**🧪 Testing Enhancements**

- Additional test scenarios
- Performance testing
- Integration test improvements

#### Contribution Process

1. **📍 Check Existing Issues**
   - Look for existing issues or feature requests
   - Comment on issues you'd like to work on
   - Create new issues for bugs or feature requests

2. **💻 Development Workflow**

   ```bash
   # Create feature branch
   git checkout -b feature/awesome-enhancement

   # Make your changes
   # Write comprehensive tests

   # Verify everything works
   npm test
   npm run test:coverage
   npm run lint  # If available

   # Commit with clear message
   git commit -m "feat: add awesome enhancement with full test coverage"
   ```

3. **✅ Pre-Pull Request Checklist**
   - [ ] All tests pass (`npm test`)
   - [ ] 100% test coverage maintained
   - [ ] TypeScript compiles without errors
   - [ ] New APIs follow existing patterns
   - [ ] Documentation updated (if needed)
   - [ ] Commit messages are clear and descriptive

4. **🔄 Pull Request Process**
   - Create a descriptive PR title and description
   - Reference any related issues
   - Include screenshots/examples if relevant
   - Respond to code review feedback promptly

### 🏗️ Development Architecture

#### Adding New API Modules

```typescript
// Follow this pattern in src/apis/[category]/new-module.ts
export const newFunction = (params: Params): Promise<Response> => {
  return client.get(`/api/endpoint/${params.id}`);
};

export default {
  newFunction,
  // ... other functions
};
```

#### Writing Tests

```typescript
// Create corresponding test in tests/apis/[category]/new-module.test.ts
describe('New Module API', () => {
  it('should call client with correct parameters', () => {
    // Test implementation following existing patterns
  });
});
```

#### File Structure for New Features

```
src/apis/[category]/
├── new-feature.ts          # Implementation
└── index.ts               # Update exports

tests/apis/[category]/
└── new-feature.test.ts    # Comprehensive tests
```

### 🎯 Priority Areas

We're especially interested in contributions in these areas:

1. **API Coverage**: New HQ Rental Software API endpoints
2. **Error Handling**: Enhanced error scenarios and edge cases
3. **Developer Experience**: Better examples, documentation, and tooling
4. **Performance**: Optimization and caching strategies
5. **Testing**: Additional test scenarios and edge cases

### 🤝 Community Guidelines

- **Be Respectful**: We're all here to build something great together
- **Be Patient**: Code reviews take time to ensure quality
- **Be Collaborative**: Ask questions, offer help, share knowledge
- **Be Consistent**: Follow established patterns and conventions

### 📞 Getting Help

- **Questions**: Open a GitHub Discussion or Issue
- **Chat**: Join our community discussions
- **Documentation**: Check the `llms.txt` file for architectural guidance
- **Examples**: Look at existing modules for patterns

### 🏆 Recognition

Contributors who help maintain our high quality standards will be:

- Added to our contributors list
- Recognized in release notes
- Invited to help with project direction

### 📈 Metrics We Care About

- **Test Coverage**: Must remain at 100%
- **Code Quality**: TypeScript strict mode compliance
- **Performance**: API response handling efficiency
- **Documentation**: Clear examples and usage patterns

### 📝 Commit Message Convention

We follow conventional commits for clear project history:

```bash
feat: add new vehicle damage tracking API
fix: resolve authentication token refresh issue
docs: update API examples for fleet management
test: add edge cases for payment processing
refactor: improve error handling consistency
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

## Support

For issues and support, please refer to the [HQ Rental Software API documentation](https://api-docs.hqrentalsoftware.com/) or contact support.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
