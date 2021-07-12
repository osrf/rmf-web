import React from 'react';
export var TrashBinActionType;
(function (TrashBinActionType) {
  /**
   * Sets the current state, a payload containing the new state must be provided. The payload must
   * be either the value of the new state or a function with the signature
   * `(state: TrashBinState<T>) => T`.
   */
  TrashBinActionType[(TrashBinActionType['Set'] = 0)] = 'Set';
  /**
   * Moves the current state into the trash state and sets it to the empty value.
   */
  TrashBinActionType[(TrashBinActionType['Clear'] = 1)] = 'Clear';
  /**
   * Moves the trash state to the current state and sets it to the empty value.
   */
  TrashBinActionType[(TrashBinActionType['Restore'] = 2)] = 'Restore';
})(TrashBinActionType || (TrashBinActionType = {}));
function makeTrashBinReducer(emptyValue, restoreFunc, clearFunc) {
  return function (state, action) {
    switch (action.type) {
      case TrashBinActionType.Clear:
        if (clearFunc === undefined) {
          return {
            current: emptyValue,
            trash: state.current,
          };
        }
        return {
          current: emptyValue,
          trash: clearFunc(state.current, state.trash),
        };
      case TrashBinActionType.Restore:
        if (restoreFunc === undefined) {
          return {
            current: state.trash,
            trash: emptyValue,
          };
        }
        return {
          current: restoreFunc(state.current, state.trash),
          trash: emptyValue,
        };
      case TrashBinActionType.Set:
        if (action.payload === undefined) {
          throw new Error('Expected a payload');
        }
        if (typeof action.payload === 'function') {
          return {
            current: action.payload(state),
            trash: state.trash,
          };
        } else {
          return {
            current: action.payload,
            trash: state.trash,
          };
        }
      default:
        console.error('Unexpected action on the trashbin reducer', action);
        return state;
    }
  };
}
/**
 * A wrapper around `React.useReducer`.
 * @param initialValues Initial state.
 * @param emptyValue A value that represents the "empty" contents, the trash state is initialized
 * with this value. Tthe current state is set to this value after a "clear" dispatch and the
 * trash state is set to this value after a "restore" dispatch.
 * @param restoreFunc Callback that should return the state after restoring items from the trash.
 * By default, the restore function replaces the contents of the current state with the trash state.
 * @param clearFunc Callback that should return the trash's state after clearing the current state.
 * By default, the clear function replaces the contents of the trash state with the current state.
 */
export function useTrashBinReducer(initialValues, emptyValue, restoreFunc, clearFunc) {
  return React.useReducer(makeTrashBinReducer(emptyValue, restoreFunc, clearFunc), {
    current: initialValues,
    trash: emptyValue,
  });
}
