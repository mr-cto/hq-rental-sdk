import { auth, carRental, fleets } from '../src';

async function main(): Promise<void> {
  try {
    // Set up authentication
    auth.useApiKey('your-api-key-here');

    // Example: Get a list of addresses
    const addressList = await carRental.addresses.listAddresses();
    console.log(`Found ${addressList.length} addresses`);

    // Example: Get a list of reservations
    const reservationList = await carRental.reservations.listReservations();
    console.log(`Found ${reservationList.length} reservations`);

    // Example: Get a list of vehicles from fleet
    const vehicleList = await fleets.fleet.listVehicles({ limit: 5 });
    console.log(`Found ${vehicleList.length} vehicles`);

    // Example: Get list of currencies
    const currencyList = await carRental.currencies.listCurrencies();
    console.log(`Available currencies: ${currencyList.map((c: any) => c.code).join(', ')}`);

    console.log('HQ Rental SDK Demo completed successfully!');
  } catch (error: unknown) {
    console.error('An error occurred:', error);

    // Handle specific API errors
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as any;
      console.error('Response status:', apiError.response?.status);
      console.error('Response data:', apiError.response?.data);
    } else if (error && typeof error === 'object' && 'request' in error) {
      const requestError = error as any;
      console.error('No response received:', requestError.request);
    } else if (error instanceof Error) {
      console.error('Error message:', error.message);
    }

    process.exit(1);
  }
}

// Run the demo
main().catch(console.error);
