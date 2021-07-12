import React from 'react';
import { BaseMarkerProps } from './base-marker';
export interface ImageMarkerProps extends BaseMarkerProps {
  iconPath: string;
  onError?: React.EventHandler<React.SyntheticEvent<SVGImageElement, Event>>;
}
export declare const ImageMarker: (props: ImageMarkerProps) => JSX.Element | null;
export default ImageMarker;
