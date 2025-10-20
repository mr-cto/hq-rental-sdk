// System module is deprecated - APIs have been moved to specific modules:
// - webhooks.ts for webhook management
// - daily-manifest.ts for daily manifest functionality  
// - filters.ts for filter examples
// - preferences.ts for preference management

// This module is kept for backward compatibility
import webhooks from './webhooks';
import dailyManifest from './daily-manifest';
import filters from './filters';
import preferences from './preferences';

export default {
  ...webhooks,
  ...dailyManifest,
  ...filters,
  ...preferences,
};