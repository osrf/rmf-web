import React from 'react';
declare type DataValueTypePrimitive = number | string;
declare type DataValueTypeArray = DataValueTypePrimitive[];
declare type DataValueType = DataValueTypePrimitive | DataValueTypeArray;
/**
 * @param name label of the row
 * @param value value of the row
 * @param className add and override styles
 * @param className.value adds and style to the value
 * @param className.overrideValue overrides the style of the value.
 * @param className.overrideArrayItemValue overrides the style of the value
 * in case the value is an array
 * @param disabled adds the disabled style
 * @param wrap wraps the context of the text
 */
export interface SimpleInfoData<T extends DataValueType = DataValueType> {
  name: string;
  value: T;
  className?: {
    value?: T extends DataValueTypeArray ? string | string[] : string;
    overrideValue?: string;
    overrideArrayItemValue?: string;
  };
  disabled?: boolean;
  wrap?: boolean;
}
export interface SimpleInfoProps extends React.HTMLProps<HTMLDivElement> {
  infoData: SimpleInfoData[];
  overrideStyle?: {
    container?: string;
    tableRow?: string;
  };
}
export declare const SimpleInfo: (props: SimpleInfoProps) => JSX.Element;
export default SimpleInfoProps;
