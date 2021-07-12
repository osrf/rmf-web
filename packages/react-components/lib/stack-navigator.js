var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
    return to;
  };
import React from 'react';
/**
 * A reducer hook that helps manage a stack of views.
 * @param initialState
 * @param homeView
 */
export function useStackNavigator(initialState, homeView) {
  var _a = React.useState(initialState),
    stack = _a[0],
    setStack = _a[1];
  return [
    stack,
    {
      push: function (viewId) {
        return setStack(function (prev) {
          return __spreadArray(__spreadArray([], prev), [viewId]);
        });
      },
      pop: function () {
        return setStack(function (prev) {
          return prev.length > 1 ? prev.slice(0, prev.length - 1) : prev;
        });
      },
      home: function () {
        return setStack(function (prev) {
          return __spreadArray(__spreadArray([], prev), [homeView]);
        });
      },
      reset: function () {
        return setStack(initialState);
      },
    },
  ];
}
export default useStackNavigator;
