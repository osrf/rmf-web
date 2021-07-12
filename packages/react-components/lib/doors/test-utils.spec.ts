import * as RmfModels from 'rmf-models';

export function makeDoor(door?: Partial<RmfModels.Door>): RmfModels.Door {
  return {
    name: 'test',
    door_type: RmfModels.Door.DOOR_TYPE_SINGLE_SWING,
    motion_direction: 1,
    motion_range: Math.PI / 2,
    v1_x: 0,
    v1_y: 0,
    v2_x: 1,
    v2_y: 1,
    ...door,
  };
}

export function allDoorTypes(): number[] {
  return [
    RmfModels.Door.DOOR_TYPE_DOUBLE_SLIDING,
    RmfModels.Door.DOOR_TYPE_DOUBLE_SWING,
    RmfModels.Door.DOOR_TYPE_DOUBLE_TELESCOPE,
    RmfModels.Door.DOOR_TYPE_SINGLE_SLIDING,
    RmfModels.Door.DOOR_TYPE_SINGLE_SWING,
    RmfModels.Door.DOOR_TYPE_SINGLE_TELESCOPE,
    RmfModels.Door.DOOR_TYPE_UNDEFINED,
    -1,
  ];
}

export function makeDoorState(state?: Partial<RmfModels.DoorState>): RmfModels.DoorState {
  return {
    door_name: 'test',
    current_mode: { value: RmfModels.DoorMode.MODE_CLOSED },
    door_time: { sec: 0, nanosec: 0 },
    ...state,
  };
}

export function allDoorModes(): RmfModels.DoorMode[] {
  return [
    { value: RmfModels.DoorMode.MODE_CLOSED },
    { value: RmfModels.DoorMode.MODE_OPEN },
    { value: RmfModels.DoorMode.MODE_MOVING },
    { value: -1 },
  ];
}
