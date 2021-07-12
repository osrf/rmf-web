import * as RmfModels from 'rmf-models';
/**
 * Create an object that automatically creates a value if it doesn't exist.
 */
export declare function defaultDict<T>(factory: (key: any) => T): Record<any, T>;
/**
 * Converts a ROS time representation to a javascript Date object.
 * The timezone is assumed to be UTC.
 * The precision will be reduced to milliseconds.
 */
export declare function rosTimeToJs(rosTime: RmfModels.Time): Date;
