import { createCustomer, updateCustomer, getCustomer } from '../src/apis/customers';
import { Customer } from '../src/models/customer';

describe('Customer API', () => {
    let customerId: string;

    beforeAll(async () => {
        const newCustomer: Customer = {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
        };
        const createdCustomer = await createCustomer(newCustomer);
        customerId = createdCustomer.id;
    });

    test('should create a new customer', async () => {
        const customer: Customer = {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
        };
        const createdCustomer = await createCustomer(customer);
        expect(createdCustomer).toHaveProperty('id');
        expect(createdCustomer.name).toBe(customer.name);
        expect(createdCustomer.email).toBe(customer.email);
    });

    test('should get an existing customer', async () => {
        const customer = await getCustomer(customerId);
        expect(customer).toHaveProperty('id', customerId);
        expect(customer).toHaveProperty('name');
        expect(customer).toHaveProperty('email');
    });

    test('should update an existing customer', async () => {
        const updatedData = { name: 'Johnathan Doe', email: 'johnathan.doe@example.com' };
        const updatedCustomer = await updateCustomer(customerId, updatedData);
        expect(updatedCustomer).toHaveProperty('id', customerId);
        expect(updatedCustomer.name).toBe(updatedData.name);
        expect(updatedCustomer.email).toBe(updatedData.email);
    });
});