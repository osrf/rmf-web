import Debug from 'debug';
import React, { useContext } from 'react';
import { DoorMarker as DoorMarker_, DoorMarkerProps } from 'react-components';
import * as RmfModels from 'rmf-models';
import { viewBoxFromLeafletBounds } from '../../util/css-utils';
import { DoorStateContext } from '../rmf-app';
import SVGOverlay, { SVGOverlayProps } from './svg-overlay';

const debug = Debug('ScheduleVisualizer:DoorsOverlay');
const DoorMarker = React.memo(DoorMarker_);

export interface DoorsOverlayProps extends SVGOverlayProps {
  doors: readonly RmfModels.Door[];
  onDoorClick?(door: RmfModels.Door): void;
}

export const DoorsOverlay = (props: DoorsOverlayProps) => {
  debug('render');

  const { doors, onDoorClick, ...otherProps } = props;
  const viewBox = viewBoxFromLeafletBounds(props.bounds);
  const doorsState = useContext(DoorStateContext);

  const handleDoorClick = React.useCallback<Required<DoorMarkerProps>['onClick']>(
    (_, door) => onDoorClick && onDoorClick(door),
    [onDoorClick],
  );

  return (
    <SVGOverlay {...otherProps}>
      <svg viewBox={viewBox}>
        {doors.map((door) => (
          <DoorMarker
            key={door.name}
            onClick={handleDoorClick}
            door={door}
            doorMode={
              doorsState && doorsState[door.name] && doorsState[door.name].current_mode.value
            }
            aria-label={door.name}
            data-component="DoorMarker"
            data-testid="doorMarker"
          />
        ))}
      </svg>
    </SVGOverlay>
  );
};

export default DoorsOverlay;
