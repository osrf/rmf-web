/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type HealthStatus = string;
export type HealthMessage = string;
export type Id = string;

export interface RobotHealth {
  health_status?: HealthStatus;
  health_message?: HealthMessage;
  id_: Id;
}
