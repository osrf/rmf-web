import * as RmfModels from 'rmf-models';
import React from 'react';
export interface LiftRequestFormProps {
  lift: RmfModels.Lift;
  availableRequestTypes: number[];
  availableDoorModes: number[];
  onRequestSubmit?(
    event: React.FormEvent,
    lift: RmfModels.Lift,
    doorState: number,
    requestType: number,
    destination: string,
  ): void;
}
export declare const LiftRequestForm: (props: LiftRequestFormProps) => JSX.Element;
export default LiftRequestForm;
