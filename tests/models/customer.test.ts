import { Customer, CustomerModel } from '../../src/models/customer';

describe('Customer Models', () => {
  describe('Customer Interface', () => {
    it('should define the correct interface structure', () => {
      const customer: Customer = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '123 Main St',
        validateEmail: () => true,
        validatePhone: () => true,
      };

      expect(customer.id).toBe('1');
      expect(customer.name).toBe('John Doe');
      expect(customer.email).toBe('john@example.com');
      expect(customer.phone).toBe('+1234567890');
      expect(customer.address).toBe('123 Main St');
      expect(typeof customer.validateEmail).toBe('function');
      expect(typeof customer.validatePhone).toBe('function');
    });

    it('should allow optional properties', () => {
      const customer: Customer = {
        id: '1',
        name: 'Jane Doe',
        email: 'jane@example.com',
        validateEmail: () => true,
        validatePhone: () => true,
      };

      expect(customer.phone).toBeUndefined();
      expect(customer.address).toBeUndefined();
    });
  });

  describe('CustomerModel Class', () => {
    describe('constructor', () => {
      it('should create instance with all properties', () => {
        const customer = new CustomerModel(
          '1',
          'John Doe',
          'john@example.com',
          '+1234567890',
          '123 Main St',
        );

        expect(customer.id).toBe('1');
        expect(customer.name).toBe('John Doe');
        expect(customer.email).toBe('john@example.com');
        expect(customer.phone).toBe('+1234567890');
        expect(customer.address).toBe('123 Main St');
      });

      it('should create instance with required properties only', () => {
        const customer = new CustomerModel('2', 'Jane Smith', 'jane@example.com');

        expect(customer.id).toBe('2');
        expect(customer.name).toBe('Jane Smith');
        expect(customer.email).toBe('jane@example.com');
        expect(customer.phone).toBeUndefined();
        expect(customer.address).toBeUndefined();
      });

      it('should create instance with phone but no address', () => {
        const customer = new CustomerModel('3', 'Bob Johnson', 'bob@example.com', '+9876543210');

        expect(customer.id).toBe('3');
        expect(customer.name).toBe('Bob Johnson');
        expect(customer.email).toBe('bob@example.com');
        expect(customer.phone).toBe('+9876543210');
        expect(customer.address).toBeUndefined();
      });
    });

    describe('validateEmail method', () => {
      it('should validate correct email addresses', () => {
        const validEmails = [
          'test@example.com',
          'user.name@domain.co.uk',
          'user+tag@example.org',
          'user123@test.io',
          'first.last@subdomain.domain.com',
        ];

        validEmails.forEach(email => {
          const customer = new CustomerModel('1', 'Test User', email);
          expect(customer.validateEmail()).toBe(true);
        });
      });

      it('should reject invalid email addresses', () => {
        const invalidEmails = [
          'invalid-email',
          '@example.com',
          'user@',
          'user@.com',
          '',
          'user name@example.com',
        ];

        invalidEmails.forEach(email => {
          const customer = new CustomerModel('1', 'Test User', email);
          expect(customer.validateEmail()).toBe(false);
        });
      });

      it('should handle edge cases', () => {
        const customer1 = new CustomerModel('1', 'Test', 'a@b.c');
        expect(customer1.validateEmail()).toBe(true);

        const customer2 = new CustomerModel(
          '2',
          'Test',
          'very-long-email-address-that-might-cause-issues@very-long-domain-name-that-should-still-work.com',
        );
        expect(customer2.validateEmail()).toBe(true);
      });
    });

    describe('validatePhone method', () => {
      it('should validate correct phone numbers', () => {
        const validPhones = [
          '+1234567890',
          '+123456789012345', // Max length (15 digits)
          '+12345678901',
          '+987654321',
          '1234567890',
        ];

        validPhones.forEach(phone => {
          const customer = new CustomerModel('1', 'Test User', 'test@example.com', phone);
          expect(customer.validatePhone()).toBe(true);
        });
      });

      it('should reject invalid phone numbers', () => {
        const invalidPhones = [
          '+0123456789', // Starts with 0 after +
          '0123456789', // Starts with 0
          '+abc123456789', // Contains letters
          '++1234567890', // Double plus
          '+123-456-7890', // Contains dashes
        ];

        invalidPhones.forEach(phone => {
          const customer = new CustomerModel('1', 'Test User', 'test@example.com', phone);
          expect(customer.validatePhone()).toBe(false);
        });
      });

      it('should return true when phone is undefined', () => {
        const customer = new CustomerModel('1', 'Test User', 'test@example.com');
        expect(customer.validatePhone()).toBe(true);
      });

      it('should return true when phone is empty string', () => {
        const customer = new CustomerModel('1', 'Test User', 'test@example.com', '');
        expect(customer.validatePhone()).toBe(true);
      });
    });

    describe('Customer interface implementation', () => {
      it('should implement Customer interface correctly', () => {
        const customer = new CustomerModel(
          '1',
          'Test User',
          'test@example.com',
          '+1234567890',
          '123 Main St',
        );

        // Should satisfy Customer interface
        const customerInterface: Customer = customer;

        expect(customerInterface.id).toBe('1');
        expect(customerInterface.name).toBe('Test User');
        expect(customerInterface.email).toBe('test@example.com');
        expect(customerInterface.phone).toBe('+1234567890');
        expect(customerInterface.address).toBe('123 Main St');
        expect(typeof customerInterface.validateEmail).toBe('function');
        expect(typeof customerInterface.validatePhone).toBe('function');
      });
    });

    describe('Property Updates', () => {
      it('should allow property updates', () => {
        const customer = new CustomerModel('1', 'Original Name', 'original@example.com');

        customer.name = 'Updated Name';
        customer.email = 'updated@example.com';
        customer.phone = '+1111111111';
        customer.address = 'New Address';

        expect(customer.name).toBe('Updated Name');
        expect(customer.email).toBe('updated@example.com');
        expect(customer.phone).toBe('+1111111111');
        expect(customer.address).toBe('New Address');
      });

      it('should validate updated email', () => {
        const customer = new CustomerModel('1', 'Test User', 'valid@example.com');
        expect(customer.validateEmail()).toBe(true);

        customer.email = 'invalid-email';
        expect(customer.validateEmail()).toBe(false);

        customer.email = 'valid-again@example.com';
        expect(customer.validateEmail()).toBe(true);
      });

      it('should validate updated phone', () => {
        const customer = new CustomerModel('1', 'Test User', 'test@example.com', '+1234567890');
        expect(customer.validatePhone()).toBe(true);

        customer.phone = 'invalid-phone';
        expect(customer.validatePhone()).toBe(false);

        customer.phone = '+9876543210';
        expect(customer.validatePhone()).toBe(true);
      });
    });

    describe('Multiple Instances', () => {
      it('should handle multiple instances independently', () => {
        const customer1 = new CustomerModel('1', 'Customer One', 'one@example.com');
        const customer2 = new CustomerModel('2', 'Customer Two', 'two@example.com');

        customer1.phone = '+1111111111';
        customer2.phone = '+2222222222';

        expect(customer1.phone).toBe('+1111111111');
        expect(customer2.phone).toBe('+2222222222');
        expect(customer1.id).not.toBe(customer2.id);
        expect(customer1.name).not.toBe(customer2.name);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle special characters in names', () => {
      const customer = new CustomerModel('1', `O'Brien-Smith Jr.`, 'test@example.com');
      expect(customer.name).toBe(`O'Brien-Smith Jr.`);
    });

    it('should handle unicode characters', () => {
      const customer = new CustomerModel('1', 'José González', 'jose@example.com');
      expect(customer.name).toBe('José González');
    });

    it('should handle long inputs', () => {
      const longName = 'A'.repeat(1000);
      const longEmail = 'test@' + 'a'.repeat(100) + '.com';
      const customer = new CustomerModel('1', longName, longEmail);

      expect(customer.name).toBe(longName);
      expect(customer.email).toBe(longEmail);
    });
  });
});
