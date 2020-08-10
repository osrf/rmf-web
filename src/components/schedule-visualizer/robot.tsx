import { makeStyles } from '@material-ui/core';
import * as RomiCore from '@osrf/romi-js-core-interfaces';
import React, { useMemo, useState, useEffect, useContext } from 'react';
import ColorManager from './colors';
import ResourceManager from '../../resource-manager';
import { IconContext } from '../../app-contexts';
import RobotDefaultIcon from './robot-default-icon';
import RobotImageIcon from './robot-image-icon';

const useStyles = makeStyles(() => ({
  robotText: {
    dominantBaseline: 'central',
    textAnchor: 'middle',
    fontSize: '0.18px',
    fontWeight: 'bold',
    fill: 'white',
    /* 1 pixel black shadow to left, top, right and bottom */
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
  },
}));

export interface RobotProps {
  robot: RomiCore.RobotState;
  colorManager: ColorManager;
  footprint: number;
  fleetName: string;
  onClick?(e: React.MouseEvent<SVGGElement>, robot: RomiCore.RobotState): void;
  inConflict?: boolean;
}

const Robot = React.forwardRef(function(
  props: RobotProps,
  ref: React.Ref<SVGGElement>,
): React.ReactElement {
  const iconContext = useContext(IconContext);
  const classes = useStyles();
  const { robot, footprint, colorManager, fleetName, onClick } = props;
  const [iconError, setIconError] = useState(false);
  const [renderDefaultIcon, setRenderDefaultIcon] = useState(false);

  // The only image formats SVG software support are JPEG, PNG, and other SVG files.
  const iconPath = useMemo(() => ResourceManager.getRobotIconPath(iconContext, fleetName), [
    iconContext,
    fleetName,
  ]);

  useEffect(() => {
    setRenderDefaultIcon(!iconPath || !!iconError);
  }, [iconPath, iconError]);

  return (
    <>
      <g
        ref={ref}
        data-component="Robot"
        aria-label={robot.name}
        onClick={e => onClick && onClick(e, robot)}
      >
        {!!iconPath && !iconError && (
          <RobotImageIcon
            iconPath={iconPath}
            robot={robot}
            footprint={footprint}
            dispatchIconError={setIconError}
            onClick={onClick}
          />
        )}
        {renderDefaultIcon && (
          <RobotDefaultIcon
            robot={robot}
            footprint={footprint}
            colorManager={colorManager}
            onClick={onClick}
          ></RobotDefaultIcon>
        )}
        <text
          id="robotName"
          x={robot.location.x}
          y={-robot.location.y}
          className={classes.robotText}
        >
          {robot.name.substring(0, 8)}
        </text>
      </g>
    </>
  );
});

export default Robot;
