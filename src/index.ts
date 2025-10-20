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
import * as files from './apis/files';
import financial from './apis/car-rental/financial';
import fleet from './apis/fleets/fleet';
import fleetManagement from './apis/fleets/fleet-management';
import pricing from './apis/car-rental/pricing';
import reservations from './apis/car-rental/reservations';
import * as sheets from './apis/sheets';
import system from './apis/car-rental/system';
import * as paymentGateways from './apis/payment-gateways';
import * as contacts from './apis/contacts';
import filters from './apis/filters';
import preferences from './apis/preferences';

// Import organized categories
import * as carRental from './apis/car-rental';
import * as fleets from './apis/fleets';

// Re-export standalone API types
export type { FilterExample } from './apis/filters';
export type { ModulePreference } from './apis/preferences';

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
  filters,
  preferences,

  // Organized categories
  carRental,
  fleets,
};

export default client;
