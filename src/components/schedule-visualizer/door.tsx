import { makeStyles } from '@material-ui/core';
import * as RomiCore from '@osrf/romi-js-core-interfaces';
import React, { useContext } from 'react';
import { DoorStateContext } from '../app';

const OPEN = 0;
const PROCESS = 1;
const CLOSE = 2;
export interface DoorProps {
  door: RomiCore.Door;
  onClick?(e: React.MouseEvent<SVGGElement>, place: RomiCore.Door): void;
}

const Door = React.forwardRef(function(
  props: DoorProps,
  ref: React.Ref<SVGGElement>,
): React.ReactElement {
  const { door, onClick } = props;

  const x = Math.min(door.v1_x, door.v2_x);
  const y = -1 * Math.min(door.v1_y, door.v2_y);
  const width = Math.abs(door.v2_x - door.v1_x);
  const height = Math.abs(door.v2_y - door.v1_y);
  const classes = useStyles();

  const useStateValue = () => useContext(DoorStateContext);
  const doorState = useStateValue() as any;
  const currentDoor = doorState && doorState[door.name];
  const currentMode = currentDoor ? currentDoor.current_mode.value : OPEN;
  const fillColor = currentMode === OPEN ? 'brown' : currentMode === PROCESS ? 'blue' : 'red';
  console.log(props);
  console.log(useStateValue());
  return (
    <g ref={ref} onClick={e => onClick && onClick(e as any, door)}>
      <rect
        className={classes.doorMarker}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        opacity={0.95}
      />
    </g>
  );
});

export default Door;

const useStyles = makeStyles(() => ({
  doorMarker: {
    cursor: 'pointer',
    pointerEvents: 'auto',
  },
}));
