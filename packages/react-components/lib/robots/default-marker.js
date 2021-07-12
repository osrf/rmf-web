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
import { useTheme } from '@material-ui/core';
import React from 'react';
import { ColorContext } from '../color-manager';
import { uniqueId } from '../css-utils';
/**
 *
 * @param color MUST be in hex notation without alpha channel. e.g. #123456
 */
function makeGradientShadow(color) {
  return function (props) {
    return React.createElement(
      'radialGradient',
      __assign({}, props),
      React.createElement('stop', { offset: '70%', stopColor: color + 'ff' }),
      React.createElement('stop', { offset: '75%', stopColor: color + '80' }),
      React.createElement('stop', { offset: '80%', stopColor: color + '60' }),
      React.createElement('stop', { offset: '85%', stopColor: color + '30' }),
      React.createElement('stop', { offset: '90%', stopColor: color + '18' }),
      React.createElement('stop', { offset: '95%', stopColor: color + '08' }),
      React.createElement('stop', { offset: '100%', stopColor: color + '00' }),
    );
  };
}
export var DefaultMarker = function (props) {
  var color = props.color,
    footprint = props.footprint,
    _a = props.variant,
    variant = _a === void 0 ? 'normal' : _a;
  var colorManager = React.useContext(ColorContext);
  var theme = useTheme();
  var componentId = React.useMemo(uniqueId, []);
  var shadowId = React.useMemo(
    function () {
      return 'RobotDefaultIcon-' + componentId + '-shadow';
    },
    [componentId],
  );
  var conflictShadowId = React.useMemo(
    function () {
      return 'RobotDefaultIcon-' + componentId + '-shadow-conflict';
    },
    [componentId],
  );
  var Shadow = React.useMemo(function () {
    return makeGradientShadow('#000000');
  }, []);
  var ShadowConflict = React.useMemo(
    function () {
      return makeGradientShadow(colorManager.conflictHighlight);
    },
    [colorManager.conflictHighlight],
  );
  return React.createElement(
    'g',
    null,
    React.createElement(
      'defs',
      null,
      React.createElement(Shadow, { id: shadowId }),
      React.createElement(ShadowConflict, { id: conflictShadowId }),
    ),
    React.createElement('circle', {
      id: 'shadow',
      r: footprint * 1.3,
      fill: variant === 'inConflict' ? 'url(#' + conflictShadowId + ')' : 'url(#' + shadowId + ')',
    }),
    React.createElement('circle', { r: footprint, fill: color }),
    React.createElement('line', {
      x2: footprint,
      stroke: theme.palette.common.black,
      strokeWidth: '0.05',
    }),
  );
};
export default DefaultMarker;
