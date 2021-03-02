/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * HEALTHY: Healthy<br/>UNHEALTHY: Unhealthy<br/>DEAD: Dead
 */
export type HealthStatus = string;
export type HealthMessage = string;
export type Name = string;

export interface DoorHealth {
  health_status?: HealthStatus;
  health_message?: HealthMessage;
  name: Name;
}
