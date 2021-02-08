import L from 'leaflet';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ColorManager } from 'react-components';
import { Map as LMap } from 'react-leaflet';
import getBuildingMap from '../../../mock/data/building-map';
import fakeFleets from '../../../mock/data/fleets';
import RobotsOverlay from '../robots-overlay';

describe('Robots Overlay', () => {
  let colorManager: ColorManager;

  beforeEach(() => {
    // TextEncoder is not available in node
    colorManager = new ColorManager();
    colorManager.robotPrimaryColor = jest.fn(async () => 'black');
  });

  const bounds = new L.LatLngBounds([0, 25.7], [-14, 0]);
  let conflictRobotNames: string[][] = [];

  test('Render robots correctly', async () => {
    const buildingMap = await getBuildingMap();
    const fleet = fakeFleets()[0];
    const robots = fleet.robots;
    const root = render(
      <LMap
        bounds={[
          [0, 0],
          [1, 1],
        ]}
      >
        <RobotsOverlay
          fleets={[fleet]}
          bounds={bounds}
          conflictRobotNames={conflictRobotNames}
          currentFloorName={buildingMap.levels[0].name}
        />
      </LMap>,
    );
    await waitFor(() => expect(root.getAllByTestId('robotMarker').length).toBe(robots.length));
    root.unmount();
  });
});
