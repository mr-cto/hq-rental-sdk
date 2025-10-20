// Import functions from sub-modules
import { listCreditCards } from './credit-cards';
import {
  listPaymentMethods,
  getPaymentMethod,
  getPaymentMethodButton,
  getPaymentMethodForm,
} from './payment-methods';
import {
  getPaymentTransactionByUuid,
  listPaymentTransactions,
  createPaymentTransaction,
  refundPaymentTransaction,
} from './payment-transactions';
import {
  listStripeLocations,
  getConnectionTokenForLocation,
  getStripeTerminalConnectionToken,
} from './stripe';
import { deletePaymentGateway } from './gateway';

// Re-export types
export type { CreditCard } from './credit-cards';
export type { PaymentMethod } from './payment-methods';
export type { PaymentTransaction } from './payment-transactions';
export type { StripeLocation, ConnectionToken } from './stripe';

// Export functions directly with expected naming
export const listCustomerCreditCards = listCreditCards;
export { deletePaymentGateway };
export { listPaymentMethods, getPaymentMethod, getPaymentMethodButton, getPaymentMethodForm };
export const getPaymentTransaction = getPaymentTransactionByUuid;
export { listPaymentTransactions, createPaymentTransaction, refundPaymentTransaction };
export { listStripeLocations };
export const getConnectionToken = getConnectionTokenForLocation;
export { getStripeTerminalConnectionToken };

// Default export
export default {
  listCustomerCreditCards,
  deletePaymentGateway,
  listPaymentMethods,
  getPaymentMethod,
  getPaymentMethodButton,
  getPaymentMethodForm,
  getPaymentTransaction,
  listPaymentTransactions,
  createPaymentTransaction,
  refundPaymentTransaction,
  listStripeLocations,
  getConnectionToken,
  getStripeTerminalConnectionToken,
};
