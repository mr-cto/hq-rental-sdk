import { HQRentalClient, client } from './client';
import auth from './auth';
import * as types from './types';

// Import all API modules
import addresses from './apis/addresses';
import blockedDays from './apis/blocked-days';
import comments from './apis/comments';
import currencies from './apis/currencies';
import customers from './apis/customers';
import emails from './apis/emails';
import fields from './apis/fields';
import financial from './apis/financial';
import fleet from './apis/fleet';
import fleetManagement from './apis/fleet-management';
import inventory from './apis/inventory';
import pricing from './apis/pricing';
import rentals from './apis/rentals';
import reservations from './apis/reservations';
import system from './apis/system';

export {
  // Core
  HQRentalClient,
  client,
  auth,
  types,
  
  // API modules
  addresses,
  blockedDays,
  comments,
  currencies,
  customers,
  emails,
  fields,
  financial,
  fleet,
  fleetManagement,
  inventory,
  pricing,
  rentals,
  reservations,
  system,
};

export default client;