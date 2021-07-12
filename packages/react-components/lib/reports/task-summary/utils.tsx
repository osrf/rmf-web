import { Typography } from '@material-ui/core';
import React from 'react';
import * as RmfModels from 'rmf-models';

export const returnTaskDetails = (
  taskId: string,
  taskDescription: RmfModels.TaskDescription,
): React.ReactNode => {
  let taskTypeDetails;
  if (taskId.includes('Loop')) {
    taskTypeDetails = taskDescription.loop;
    return (
      <>
        <Typography>Num of Loops: {taskTypeDetails.num_loops}</Typography>
        <Typography>Start Point: {taskTypeDetails.start_name}</Typography>
        <Typography>End Point: {taskTypeDetails.finish_name}</Typography>
      </>
    );
  } else if (taskId.includes('Delivery')) {
    taskTypeDetails = taskDescription.delivery;
    return (
      <>
        <Typography>Pick Up: {taskTypeDetails.pickup_place_name}</Typography>
        <Typography>Drop Off: {taskTypeDetails.dropoff_place_name}</Typography>
        <Typography>End Point: {taskTypeDetails.items}</Typography>
      </>
    );
  } else if (taskId.includes('Clean')) {
    taskTypeDetails = taskDescription.clean;
    return (
      <>
        <Typography>Start Point: {taskTypeDetails.start_waypoint}</Typography>
      </>
    );
  }
};
