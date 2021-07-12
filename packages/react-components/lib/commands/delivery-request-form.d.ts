import React from 'react';
import * as RmfModels from 'rmf-models';
export declare type DoDeliveryRequest = (
  pickupPlaceName: string,
  pickupDispenser: string,
  dropOffPlaceName: string,
  dropOffDispenser: string,
  pickupBehaviour?: RmfModels.Behavior,
  dropOffBehavior?: RmfModels.Behavior,
) => void;
export interface DeliveryRequestFormProps {
  fleetNames: string[];
  availablePlaces(fleet: string): string[];
  availableDispensers(fleet: string, place: string): string[];
  doDeliveryRequest?: DoDeliveryRequest;
}
export declare const DeliveryRequestForm: React.ForwardRefExoticComponent<
  DeliveryRequestFormProps & React.RefAttributes<HTMLFormElement>
>;
export default DeliveryRequestForm;
