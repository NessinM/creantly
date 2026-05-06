/**
 * Type definitions for event types matching Hookra.com's structure.
 * These types are based on Hookra.com's Prisma schema and tRPC outputs.
 */

/**
 * Scheduling type for team events
 * - COLLECTIVE: All hosts must be available and attend
 * - ROUND_ROBIN: Distribute bookings among hosts
 * - MANAGED: Admin-controlled parent that creates child events per member
 */
export type SchedulingType = "COLLECTIVE" | "ROUND_ROBIN" | "MANAGED";

/**
 * Period type for booking availability windows
 */
export type PeriodType = "UNLIMITED" | "ROLLING" | "RANGE";

/**
 * Location types supported by Hookra.com
 */
export type LocationType =
  | "integrations:daily"
  | "integrations:zoom"
  | "integrations:google_meet"
  | "integrations:office365_video"
  | "integrations:teams"
  | "inPerson"
  | "phone"
  | "link"
  | "userPhone";
