import React from 'react';
import * as RomiCore from '@osrf/romi-js-core-interfaces';

import Lift from '../../components/schedule-visualizer/lift';
import { viewBoxCoords } from './Utils';

export interface LiftComponentProps {
    currentFloor: string;
    lift: RomiCore.Lift;
    liftState: RomiCore.LiftState;
    renderInfoPanel(): JSX.Element;
}

const styles = {
    display: {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr'
    }
};

export default function LiftComponent(props: LiftComponentProps): React.ReactElement {

    const { currentFloor, lift, liftState, renderInfoPanel } = props;

    return (
        <div style={styles.display}>
            { renderInfoPanel() }

            <div>
                <svg viewBox={viewBoxCoords}>
                    <Lift
                        lift={lift}
                        currentFloor={currentFloor}
                        liftState={liftState}
                    />
                </svg>
            </div>
        </div>
    )
}
