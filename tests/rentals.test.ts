import { createRental, updateRental, getRental } from '../src/apis/rentals';
import { Rental } from '../src/models/rental';

describe('Rental API', () => {
    let rentalId: string;

    beforeAll(async () => {
        const rentalData: Rental = {
            id: '1',
            customerId: '123',
            vehicleId: '456',
            // Add other necessary properties
        };
        const createdRental = await createRental(rentalData);
        rentalId = createdRental.id;
    });

    test('should create a rental', async () => {
        const rentalData: Rental = {
            id: '2',
            customerId: '123',
            vehicleId: '789',
            // Add other necessary properties
        };
        const rental = await createRental(rentalData);
        expect(rental).toHaveProperty('id');
        expect(rental.customerId).toBe(rentalData.customerId);
        expect(rental.vehicleId).toBe(rentalData.vehicleId);
    });

    test('should update a rental', async () => {
        const updatedData = {
            id: rentalId,
            customerId: '123',
            vehicleId: '101',
            // Add other necessary properties
        };
        const updatedRental = await updateRental(updatedData);
        expect(updatedRental.vehicleId).toBe(updatedData.vehicleId);
    });

    test('should get a rental by ID', async () => {
        const rental = await getRental(rentalId);
        expect(rental).toHaveProperty('id', rentalId);
    });
});