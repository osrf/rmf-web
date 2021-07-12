/// <reference types="react" />
import { BaseMarkerProps } from './base-marker';
export interface DefaultMarkerProps extends BaseMarkerProps {
  color: string;
}
export declare const DefaultMarker: (props: DefaultMarkerProps) => JSX.Element;
export default DefaultMarker;
