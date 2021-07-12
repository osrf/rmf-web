import * as RmfModels from 'rmf-models';
export var DoorType;
(function (DoorType) {
  DoorType[(DoorType['SingleSwing'] = RmfModels.Door.DOOR_TYPE_SINGLE_SWING)] = 'SingleSwing';
  DoorType[(DoorType['SingleSliding'] = RmfModels.Door.DOOR_TYPE_SINGLE_SLIDING)] = 'SingleSliding';
  DoorType[(DoorType['SingleTelescope'] = RmfModels.Door.DOOR_TYPE_SINGLE_TELESCOPE)] =
    'SingleTelescope';
  DoorType[(DoorType['DoubleSwing'] = RmfModels.Door.DOOR_TYPE_DOUBLE_SWING)] = 'DoubleSwing';
  DoorType[(DoorType['DoubleSliding'] = RmfModels.Door.DOOR_TYPE_DOUBLE_SLIDING)] = 'DoubleSliding';
  DoorType[(DoorType['DoubleTelescope'] = RmfModels.Door.DOOR_TYPE_DOUBLE_TELESCOPE)] =
    'DoubleTelescope';
})(DoorType || (DoorType = {}));
export var DoorMotion;
(function (DoorMotion) {
  DoorMotion[(DoorMotion['Clockwise'] = 1)] = 'Clockwise';
  DoorMotion[(DoorMotion['AntiClockwise'] = -1)] = 'AntiClockwise';
})(DoorMotion || (DoorMotion = {}));
export var DoorMode;
(function (DoorMode) {
  DoorMode[(DoorMode['Open'] = RmfModels.DoorMode.MODE_OPEN)] = 'Open';
  DoorMode[(DoorMode['Closed'] = RmfModels.DoorMode.MODE_CLOSED)] = 'Closed';
  DoorMode[(DoorMode['Moving'] = RmfModels.DoorMode.MODE_MOVING)] = 'Moving';
})(DoorMode || (DoorMode = {}));
