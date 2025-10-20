// Fleets APIs
export { default as fleet } from './fleet';
export { default as fleetManagement } from './fleet-management';
export { default as brands } from './brands';
export { default as damages } from './damages';
export { default as blockedPeriods } from './blocked-periods';
export { default as relocations } from './relocations';
export { default as telematics } from './telematics';

// Re-export types individually
export type { 
  Vehicle, 
  VehicleModel, 
  VehicleType, 
  MaintenanceRecord, 
  VehicleAlert, 
  VehicleTrip 
} from './fleet';
export type { 
  AdditionalCharge, 
  Feature, 
  Location, 
  RepairOrder 
} from './fleet-management';
export type { VehicleBrand } from './brands';
export type { VehicleDamage } from './damages';
export type { BlockedPeriod } from './blocked-periods';
export type { VehicleRelocation } from './relocations';
export type { TelematicsData, TelematicsDevice } from './telematics';