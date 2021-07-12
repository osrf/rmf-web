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
      React.createElement('stop', { offset: '0%', stopColor: color + '80' }),
      React.createElement('stop', { offset: '70%', stopColor: color + '40' }),
      React.createElement('stop', { offset: '90%', stopColor: color + '10' }),
      React.createElement('stop', { offset: '100%', stopColor: color + '00' }),
    );
  };
}
export var ImageMarker = function (props) {
  var iconPath = props.iconPath,
    footprint = props.footprint,
    variant = props.variant,
    onError = props.onError;
  // The default icon uses footprint as the radius, so we * 2 here because the width/height
  // is in a square. With the double size of the footprint, we achieved a similar
  // size to the robot default svg icon.
  var _a = React.useMemo(
      function () {
        return [footprint * 2, footprint * 2];
      },
      [footprint],
    ),
    imgIconWidth = _a[0],
    imgIconHeight = _a[1];
  var colorManager = React.useContext(ColorContext);
  var componentId = React.useMemo(uniqueId, []);
  var shadowId = React.useMemo(
    function () {
      return 'RobotImageIcon-' + componentId + '-shadow';
    },
    [componentId],
  );
  var conflictShadowId = React.useMemo(
    function () {
      return 'RobotImageIcon-' + componentId + '-shadow-conflict';
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
  return iconPath
    ? React.createElement(
        'g',
        null,
        React.createElement(
          'defs',
          null,
          React.createElement(Shadow, { id: shadowId }),
          React.createElement(ShadowConflict, { id: conflictShadowId }),
        ),
        React.createElement('circle', {
          r: footprint * 1.3,
          fill:
            variant === 'inConflict' ? 'url(#' + conflictShadowId + ')' : 'url(#' + shadowId + ')',
        }),
        React.createElement('image', {
          href: iconPath,
          width: imgIconWidth,
          height: imgIconHeight,
          x: -footprint,
          y: -footprint,
          onError: onError,
        }),
      )
    : null;
};
export default ImageMarker;
