import React from 'react';
import { BaseMarkerProps } from './base-marker';
export interface RobotMarkerProps extends BaseMarkerProps {
  iconPath?: string;
}
/**
 * Contexts: ColorContext
 */
export declare const RobotMarker: React.ForwardRefExoticComponent<
  RobotMarkerProps & React.RefAttributes<SVGGElement>
>;
export default RobotMarker;
