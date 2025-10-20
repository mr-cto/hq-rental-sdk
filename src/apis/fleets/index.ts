// Fleets APIs
export { default as fleet } from './fleet';
export { default as fleetManagement } from './fleet-management';
export { default as brands } from './brands';
export { default as damages } from './damages';
export { default as blockedPeriods } from './blocked-periods';
export { default as relocations } from './relocations';
export { default as telematics } from './telematics';
export { default as additionalCharges } from './additional-charges';
export { default as features } from './features';
export { default as locations } from './locations';
export { default as vehicleModels } from './vehicle-models';
export { default as vehicleTypes } from './vehicle-types';
export { default as vehicles } from './vehicles';

// Re-export types individually
export type {
  Vehicle,
  VehicleModel,
  VehicleType,
  MaintenanceRecord,
  VehicleAlert,
  VehicleTrip,
} from './fleet';
export type { AdditionalCharge, Feature, Location, RepairOrder } from './fleet-management';
export type { VehicleBrand } from './brands';
export type { VehicleDamage } from './damages';
export type { BlockedPeriod } from './blocked-periods';
export type { VehicleRelocation } from './relocations';
export type { TelematicsData, TelematicsDevice } from './telematics';
export type { AdditionalCharge as FleetAdditionalCharge } from './additional-charges';
export type { Feature as FleetFeature } from './features';
export type { Location as FleetLocation } from './locations';
export type { VehicleModel as FleetVehicleModel } from './vehicle-models';
export type { VehicleType as FleetVehicleType } from './vehicle-types';
export type {
  Vehicle as FleetVehicle,
  MaintenanceRecord as FleetMaintenanceRecord,
} from './vehicles';
