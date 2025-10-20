import * as emailsAPI from '../../../src/apis/car-rental/emails';
import client from '../../../src/client';

// Mock the client module
jest.mock('../../../src/client', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

const mockClient = client as jest.Mocked<typeof client>;

describe('Emails API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Email Templates', () => {
    describe('listEmailTemplates', () => {
      it('should call client.get with correct URL', async () => {
        const mockTemplates = [
          { id: '1', name: 'Welcome', subject: 'Welcome!', body: 'Welcome to our service' },
          {
            id: '2',
            name: 'Confirmation',
            subject: 'Confirmed',
            body: 'Your booking is confirmed',
            type: 'reservation',
          },
        ];
        mockClient.get.mockResolvedValue(mockTemplates);

        const result = await emailsAPI.listEmailTemplates();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/emails/templates');
        expect(result).toEqual(mockTemplates);
      });

      it('should handle empty templates list', async () => {
        const mockTemplates: any[] = [];
        mockClient.get.mockResolvedValue(mockTemplates);

        const result = await emailsAPI.listEmailTemplates();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/emails/templates');
        expect(result).toEqual(mockTemplates);
      });

      it('should handle templates with optional properties', async () => {
        const mockTemplates = [
          { id: '1', name: 'Basic', subject: 'Basic Template', body: 'Basic content' },
          {
            id: '2',
            name: 'Advanced',
            subject: 'Advanced Template',
            body: 'Advanced content',
            type: 'marketing',
          },
        ];
        mockClient.get.mockResolvedValue(mockTemplates);

        const result = await emailsAPI.listEmailTemplates();

        expect(mockClient.get).toHaveBeenCalledWith('/car-rental/emails/templates');
        expect(result).toEqual(mockTemplates);
      });
    });

    describe('triggerEmailTemplate', () => {
      it('should call client.post with correct URL and payload', async () => {
        const request = {
          template_id: 'template-123',
          recipient_email: 'user@example.com',
          data: { name: 'John Doe', reservation_id: 'res-456' },
        };
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.triggerEmailTemplate(request);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/emails/trigger', request);
        expect(result).toBeUndefined();
      });

      it('should handle minimal trigger request', async () => {
        const request = {
          template_id: 'template-minimal',
        };
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.triggerEmailTemplate(request);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/emails/trigger', request);
        expect(result).toBeUndefined();
      });

      it('should handle trigger request with complex data', async () => {
        const request = {
          template_id: 'template-complex',
          recipient_email: 'customer@example.com',
          data: {
            customer: { name: 'Jane Smith', id: 'cust-789' },
            reservation: { id: 'res-123', dates: ['2024-01-01', '2024-01-07'] },
            vehicle: { make: 'Toyota', model: 'Camry' },
          },
        };
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.triggerEmailTemplate(request);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/emails/trigger', request);
        expect(result).toBeUndefined();
      });

      it('should handle request without optional fields', async () => {
        const request = {
          template_id: 'template-basic',
          data: { simple: 'value' },
        };
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.triggerEmailTemplate(request);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/emails/trigger', request);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('Reservation Emails', () => {
    describe('sendReservationConfirmation', () => {
      it('should call client.post with correct URL', async () => {
        const reservationId = 'reservation-123';
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.sendReservationConfirmation(reservationId);

        expect(mockClient.post).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/confirmation`,
        );
        expect(result).toBeUndefined();
      });

      it('should handle special characters in reservation ID', async () => {
        const reservationId = 'reservation-with/special%20chars';
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.sendReservationConfirmation(reservationId);

        expect(mockClient.post).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/confirmation`,
        );
        expect(result).toBeUndefined();
      });
    });

    describe('sendReservationContract', () => {
      it('should call client.post with correct URL', async () => {
        const reservationId = 'reservation-contract';
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.sendReservationContract(reservationId);

        expect(mockClient.post).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/contract`,
        );
        expect(result).toBeUndefined();
      });

      it('should handle special characters in reservation ID', async () => {
        const reservationId = 'reservation-contract/special%20chars';
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.sendReservationContract(reservationId);

        expect(mockClient.post).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/contract`,
        );
        expect(result).toBeUndefined();
      });
    });

    describe('listReservationEmailTemplates', () => {
      it('should call client.get with correct URL', async () => {
        const reservationId = 'reservation-templates';
        const mockTemplates = [
          {
            id: '1',
            name: 'Confirmation',
            subject: 'Booking Confirmed',
            body: 'Your booking is confirmed',
          },
          {
            id: '2',
            name: 'Reminder',
            subject: 'Pickup Reminder',
            body: 'Remember your pickup tomorrow',
          },
        ];
        mockClient.get.mockResolvedValue(mockTemplates);

        const result = await emailsAPI.listReservationEmailTemplates(reservationId);

        expect(mockClient.get).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/templates`,
        );
        expect(result).toEqual(mockTemplates);
      });

      it('should handle empty reservation templates', async () => {
        const reservationId = 'reservation-no-templates';
        const mockTemplates: any[] = [];
        mockClient.get.mockResolvedValue(mockTemplates);

        const result = await emailsAPI.listReservationEmailTemplates(reservationId);

        expect(mockClient.get).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/templates`,
        );
        expect(result).toEqual(mockTemplates);
      });

      it('should handle special characters in reservation ID', async () => {
        const reservationId = 'reservation-templates/special%20chars';
        const mockTemplates = [
          {
            id: '1',
            name: 'Special Template',
            subject: 'Special Subject',
            body: 'Special content',
          },
        ];
        mockClient.get.mockResolvedValue(mockTemplates);

        const result = await emailsAPI.listReservationEmailTemplates(reservationId);

        expect(mockClient.get).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/templates`,
        );
        expect(result).toEqual(mockTemplates);
      });
    });

    describe('triggerReservationEmailTemplate', () => {
      it('should call client.post with correct URL and payload', async () => {
        const reservationId = 'reservation-trigger';
        const request = {
          template_id: 'template-res',
          recipient_email: 'customer@example.com',
          data: { customer_name: 'John Doe' },
        };
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.triggerReservationEmailTemplate(reservationId, request);

        expect(mockClient.post).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/trigger`,
          request,
        );
        expect(result).toBeUndefined();
      });

      it('should handle minimal trigger request', async () => {
        const reservationId = 'reservation-minimal';
        const request = {
          template_id: 'template-minimal',
        };
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.triggerReservationEmailTemplate(reservationId, request);

        expect(mockClient.post).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/trigger`,
          request,
        );
        expect(result).toBeUndefined();
      });

      it('should handle special characters in reservation ID', async () => {
        const reservationId = 'reservation-trigger/special%20chars';
        const request = {
          template_id: 'template-special',
          data: { special: 'data' },
        };
        mockClient.post.mockResolvedValue(undefined);

        const result = await emailsAPI.triggerReservationEmailTemplate(reservationId, request);

        expect(mockClient.post).toHaveBeenCalledWith(
          `/car-rental/reservations/${reservationId}/emails/trigger`,
          request,
        );
        expect(result).toBeUndefined();
      });
    });
  });

  describe('Quote Emails', () => {
    describe('storeQuoteAndSendEmail', () => {
      it('should call client.post with correct URL and payload', async () => {
        const quoteData = {
          customer_email: 'customer@example.com',
          quote_details: {
            vehicle: 'Toyota Camry',
            dates: ['2024-01-01', '2024-01-07'],
            total: 350.0,
          },
        };
        const mockResponse = { quote_id: 'quote-123', email_sent: true };
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await emailsAPI.storeQuoteAndSendEmail(quoteData);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/quotes/email', quoteData);
        expect(result).toEqual(mockResponse);
      });

      it('should handle empty quote data', async () => {
        const quoteData = {};
        const mockResponse = { quote_id: 'quote-empty', email_sent: false };
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await emailsAPI.storeQuoteAndSendEmail(quoteData);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/quotes/email', quoteData);
        expect(result).toEqual(mockResponse);
      });

      it('should handle complex quote data', async () => {
        const quoteData = {
          customer: {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '555-0123',
          },
          quote: {
            vehicle_id: 'vehicle-456',
            pickup_date: '2024-02-01',
            return_date: '2024-02-08',
            pickup_location: 'Airport',
            return_location: 'Downtown',
            extras: ['GPS', 'Insurance'],
            total_amount: 450.0,
            currency: 'USD',
          },
          preferences: {
            contact_method: 'email',
            language: 'en',
          },
        };
        const mockResponse = {
          quote_id: 'quote-complex',
          email_sent: true,
          email_id: 'email-789',
        };
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await emailsAPI.storeQuoteAndSendEmail(quoteData);

        expect(mockClient.post).toHaveBeenCalledWith('/car-rental/quotes/email', quoteData);
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('default export', () => {
    it('should export all functions in default object', () => {
      expect(emailsAPI.default).toHaveProperty('listEmailTemplates');
      expect(emailsAPI.default).toHaveProperty('triggerEmailTemplate');
      expect(emailsAPI.default).toHaveProperty('sendReservationConfirmation');
      expect(emailsAPI.default).toHaveProperty('sendReservationContract');
      expect(emailsAPI.default).toHaveProperty('listReservationEmailTemplates');
      expect(emailsAPI.default).toHaveProperty('triggerReservationEmailTemplate');
      expect(emailsAPI.default).toHaveProperty('storeQuoteAndSendEmail');
    });

    it('should have all functions be the same as named exports', () => {
      expect(emailsAPI.default.listEmailTemplates).toBe(emailsAPI.listEmailTemplates);
      expect(emailsAPI.default.triggerEmailTemplate).toBe(emailsAPI.triggerEmailTemplate);
      expect(emailsAPI.default.sendReservationConfirmation).toBe(
        emailsAPI.sendReservationConfirmation,
      );
      expect(emailsAPI.default.sendReservationContract).toBe(emailsAPI.sendReservationContract);
      expect(emailsAPI.default.listReservationEmailTemplates).toBe(
        emailsAPI.listReservationEmailTemplates,
      );
      expect(emailsAPI.default.triggerReservationEmailTemplate).toBe(
        emailsAPI.triggerReservationEmailTemplate,
      );
      expect(emailsAPI.default.storeQuoteAndSendEmail).toBe(emailsAPI.storeQuoteAndSendEmail);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from listEmailTemplates', async () => {
      const error = new Error('Templates fetch error');
      mockClient.get.mockRejectedValue(error);

      await expect(emailsAPI.listEmailTemplates()).rejects.toThrow('Templates fetch error');
    });

    it('should propagate errors from triggerEmailTemplate', async () => {
      const error = new Error('Email trigger error');
      mockClient.post.mockRejectedValue(error);

      await expect(emailsAPI.triggerEmailTemplate({ template_id: 'test' })).rejects.toThrow(
        'Email trigger error',
      );
    });

    it('should propagate errors from sendReservationConfirmation', async () => {
      const error = new Error('Confirmation send error');
      mockClient.post.mockRejectedValue(error);

      await expect(emailsAPI.sendReservationConfirmation('reservation-id')).rejects.toThrow(
        'Confirmation send error',
      );
    });

    it('should propagate errors from sendReservationContract', async () => {
      const error = new Error('Contract send error');
      mockClient.post.mockRejectedValue(error);

      await expect(emailsAPI.sendReservationContract('reservation-id')).rejects.toThrow(
        'Contract send error',
      );
    });

    it('should propagate errors from listReservationEmailTemplates', async () => {
      const error = new Error('Reservation templates error');
      mockClient.get.mockRejectedValue(error);

      await expect(emailsAPI.listReservationEmailTemplates('reservation-id')).rejects.toThrow(
        'Reservation templates error',
      );
    });

    it('should propagate errors from triggerReservationEmailTemplate', async () => {
      const error = new Error('Reservation email trigger error');
      mockClient.post.mockRejectedValue(error);

      await expect(
        emailsAPI.triggerReservationEmailTemplate('reservation-id', { template_id: 'test' }),
      ).rejects.toThrow('Reservation email trigger error');
    });

    it('should propagate errors from storeQuoteAndSendEmail', async () => {
      const error = new Error('Quote email error');
      mockClient.post.mockRejectedValue(error);

      await expect(emailsAPI.storeQuoteAndSendEmail({})).rejects.toThrow('Quote email error');
    });
  });
});
