import client, { auth, customers, rentals, fleet, currencies } from '../src';

async function main() {
  try {
    // Set up authentication
    auth.setToken(process.env.HQ_API_TOKEN || 'your-api-token-here');
    
    console.log('🚀 HQ Rental SDK Quickstart Example');
    
    // 1. List customers
    console.log('\n📋 Fetching customers...');
    const customerList = await customers.listCustomers({ limit: '5' });
    console.log(`Found ${customerList.length} customers`);
    
    // 2. List reservations
    console.log('\n🚗 Fetching reservations...');
    const reservationList = await rentals.listReservations({ limit: '5' });
    console.log(`Found ${reservationList.length} reservations`);
    
    // 3. List vehicles
    console.log('\n🚙 Fetching fleet vehicles...');
    const vehicleList = await fleet.listVehicles({ limit: '5' });
    console.log(`Found ${vehicleList.length} vehicles`);
    
    // 4. Create a new customer (example)
    console.log('\n👤 Creating a test customer...');
    const newCustomer = await customers.createCustomer({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890'
    });
    console.log(`Created customer: ${newCustomer.name} (${newCustomer.id})`);
    
    // 5. List currencies
    console.log('\n💱 Available currencies...');
    const currencyList = await currencies.listCurrencies();
    console.log(`Available currencies: ${currencyList.map(c => c.code).join(', ')}`);
    
    console.log('\n✅ Quickstart completed successfully!');
    
  } catch (error) {
    console.error('❌ Error occurred:', error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
}

// Run the example
if (require.main === module) {
  main();
}