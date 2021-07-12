var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import React from 'react';
import { AlertDialog } from './alert-dialog';
/**
 * A specialized `AlertDialog` for confirmation messages.
 */
export var ConfirmationAlertDialog = function (props) {
  var title = props.title,
    positiveText = props.positiveText,
    negativeText = props.negativeText,
    otherProps = __rest(props, ['title', 'positiveText', 'negativeText']);
  return React.createElement(
    AlertDialog,
    __assign(
      {
        title: title || 'Are you sure you want to continue?',
        positiveText: positiveText || 'OK',
        negativeText: negativeText || 'Cancel',
        variant: 'warn',
      },
      otherProps,
    ),
  );
};
export default ConfirmationAlertDialog;
