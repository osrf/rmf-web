import React from 'react';
export declare type DoLoopRequest = (
  fleetName: string,
  numLoops: number,
  startLocationPoint: string,
  endLocationPoint: string,
) => void;
export interface LoopRequestFormProps {
  fleetNames: string[];
  availablePlaces(fleet: string): string[];
  doLoopRequest?: DoLoopRequest;
}
export declare const LoopRequestForm: React.ForwardRefExoticComponent<
  LoopRequestFormProps & React.RefAttributes<HTMLFormElement>
>;
export default LoopRequestForm;
