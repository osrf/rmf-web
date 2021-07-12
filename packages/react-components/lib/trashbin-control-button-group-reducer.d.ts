import React from 'react';
export declare type TrashBinState<T> = {
  current: T;
  trash: T;
};
export declare enum TrashBinActionType {
  /**
   * Sets the current state, a payload containing the new state must be provided. The payload must
   * be either the value of the new state or a function with the signature
   * `(state: TrashBinState<T>) => T`.
   */
  Set = 0,
  /**
   * Moves the current state into the trash state and sets it to the empty value.
   */
  Clear = 1,
  /**
   * Moves the trash state to the current state and sets it to the empty value.
   */
  Restore = 2,
}
export declare type TrashBinAction<T> = {
  type: TrashBinActionType;
  payload?: T | ((state: TrashBinState<T>) => T);
};
export declare type TrashBinReducer<T> = React.Reducer<TrashBinState<T>, TrashBinAction<T>>;
export declare type TrashBinMergeFunc<T> = (current: T, trash: T) => T;
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
export declare function useTrashBinReducer<T>(
  initialValues: T,
  emptyValue: T,
  restoreFunc?: TrashBinMergeFunc<T>,
  clearFunc?: TrashBinMergeFunc<T>,
): [TrashBinState<T>, React.Dispatch<TrashBinAction<T>>];
