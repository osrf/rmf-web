var _a, _b;
import * as RmfModels from 'rmf-models';
export function liftModeToString(liftMode) {
  switch (liftMode) {
    case RmfModels.LiftState.MODE_AGV:
      return 'AGV';
    case RmfModels.LiftState.MODE_EMERGENCY:
      return 'Emergency';
    case RmfModels.LiftState.MODE_FIRE:
      return 'Fire';
    case RmfModels.LiftState.MODE_HUMAN:
      return 'Human';
    case RmfModels.LiftState.MODE_OFFLINE:
      return 'Offline';
    default:
      return 'Unknown (' + liftMode + ')';
  }
}
export function doorStateToString(doorState) {
  switch (doorState) {
    case RmfModels.LiftState.DOOR_OPEN:
      return 'Open';
    case RmfModels.LiftState.DOOR_CLOSED:
      return 'Closed';
    case RmfModels.LiftState.DOOR_MOVING:
      return 'Moving';
    default:
      return 'Unknown (' + doorState + ')';
  }
}
export function motionStateToString(motionState) {
  switch (motionState) {
    case RmfModels.LiftState.MOTION_DOWN:
      return 'Down';
    case RmfModels.LiftState.MOTION_STOPPED:
      return 'Stopped';
    case RmfModels.LiftState.MOTION_UP:
      return 'Up';
    default:
      return 'Unknown (' + motionState + ')';
  }
}
export var requestModes = [
  RmfModels.LiftRequest.REQUEST_AGV_MODE,
  RmfModels.LiftRequest.REQUEST_HUMAN_MODE,
  RmfModels.LiftRequest.REQUEST_END_SESSION,
];
export var requestModeStrings =
  ((_a = {}),
  (_a[RmfModels.LiftRequest.REQUEST_END_SESSION] = 'End Session'),
  (_a[RmfModels.LiftRequest.REQUEST_AGV_MODE] = 'AGV'),
  (_a[RmfModels.LiftRequest.REQUEST_HUMAN_MODE] = 'Human'),
  _a);
export function requestModeToString(requestMode) {
  return requestModeStrings[requestMode] || 'Unknown (' + requestMode + ')';
}
export var requestDoorModes = [RmfModels.LiftRequest.DOOR_OPEN, RmfModels.LiftRequest.DOOR_CLOSED];
export var requestDoorModeStrings =
  ((_b = {}),
  (_b[RmfModels.LiftRequest.DOOR_OPEN] = 'Open'),
  (_b[RmfModels.LiftRequest.DOOR_CLOSED] = 'Closed'),
  _b);
export function requestDoorModeToString(requestDoorMode) {
  return requestDoorModeStrings[requestDoorMode] || 'Unknown';
}
