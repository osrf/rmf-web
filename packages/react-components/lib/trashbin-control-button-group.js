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
import { Button, ButtonGroup } from '@material-ui/core';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import RestoreIcon from '@material-ui/icons/Restore';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
/**
 * @param disableReset disable reset button.
 * @param disableClear disable clear button.
 * @param disableRestore disable restore button.
 * @param disableSave disable save button.
 * @param showReset shows reset button. Default value `true`.
 * @param showClear shows clear button. Default value `true`.
 * @param showRestore shows restore button. Default value `true`.
 * @param showSave shows show button. Default value `true`.
 * @param onResetClick handle the click event on the reset button.
 * @param onClearClick handle the click event on the clear button.
 * @param onRestoreClick handle the click event on the restore button.
 * @param onSaveClick handle the click event on the save button.
 * @param fullWidth set property full width. Default value `true`.
 */
export var TrashBinControlButtonGroup = React.forwardRef(function (props, ref) {
  var disableReset = props.disableReset,
    disableClear = props.disableClear,
    disableRestore = props.disableRestore,
    disableSave = props.disableSave,
    _a = props.showReset,
    showReset = _a === void 0 ? true : _a,
    _b = props.showClear,
    showClear = _b === void 0 ? true : _b,
    _c = props.showRestore,
    showRestore = _c === void 0 ? true : _c,
    _d = props.showSave,
    showSave = _d === void 0 ? true : _d,
    onResetClick = props.onResetClick,
    onClearClick = props.onClearClick,
    onRestoreClick = props.onRestoreClick,
    onSaveClick = props.onSaveClick,
    _e = props.fullWidth,
    fullWidth = _e === void 0 ? true : _e,
    otherProps = __rest(props, [
      'disableReset',
      'disableClear',
      'disableRestore',
      'disableSave',
      'showReset',
      'showClear',
      'showRestore',
      'showSave',
      'onResetClick',
      'onClearClick',
      'onRestoreClick',
      'onSaveClick',
      'fullWidth',
    ]);
  return React.createElement(
    'div',
    __assign({}, otherProps, { ref: ref }),
    React.createElement(
      ButtonGroup,
      { fullWidth: fullWidth },
      showReset &&
        React.createElement(
          Button,
          {
            id: 'reset-button',
            disabled: disableReset,
            onClick: function () {
              return onResetClick && onResetClick();
            },
          },
          React.createElement(RestoreIcon, null),
          'Reset',
        ),
      showClear &&
        React.createElement(
          Button,
          {
            id: 'clear-button',
            disabled: disableClear,
            onClick: function () {
              return onClearClick && onClearClick();
            },
          },
          React.createElement(ClearAllIcon, null),
          'Clear',
        ),
      showRestore &&
        React.createElement(
          Button,
          {
            id: 'restore-button',
            disabled: disableRestore,
            onClick: function () {
              return onRestoreClick && onRestoreClick();
            },
          },
          React.createElement(RestoreFromTrashIcon, null),
          'Restore',
        ),
      showSave &&
        React.createElement(
          Button,
          {
            id: 'save-button',
            disabled: disableSave,
            onClick: function () {
              return onSaveClick && onSaveClick();
            },
          },
          React.createElement(SaveIcon, null),
          'Save',
        ),
    ),
  );
});
export default TrashBinControlButtonGroup;
