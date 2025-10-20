import { HQRentalClient, client } from './client';
import auth from './auth';
import * as types from './types';

// Import all API modules
import addresses from './apis/car-rental/addresses';
import blockedDays from './apis/car-rental/blocked-days';
import comments from './apis/car-rental/comments';
import currencies from './apis/car-rental/currencies';
import emails from './apis/car-rental/emails';
import fields from './apis/car-rental/fields';
import files from './apis/files';
import financial from './apis/car-rental/financial';
import fleet from './apis/fleets/fleet';
import fleetManagement from './apis/fleets/fleet-management';
import pricing from './apis/car-rental/pricing';
import reservations from './apis/car-rental/reservations';
import sheets from './apis/sheets';
import system from './apis/car-rental/system';
import paymentGateways from './apis/payment-gateways';
import contacts from './apis/contacts';

// Import organized categories
import * as carRental from './apis/car-rental';
import * as fleets from './apis/fleets';

export {
  // Core
  HQRentalClient,
  client,
  auth,
  types,
  
  // Individual API modules (for backward compatibility)
  addresses,
  blockedDays,
  comments,  
  currencies,
  emails,
  fields,
  files,
  financial,
  fleet,
  fleetManagement,
  pricing,
  reservations,
  sheets,
  system,
  paymentGateways,
  contacts,
  
  // Organized categories
  carRental,
  fleets,
};

export default client;