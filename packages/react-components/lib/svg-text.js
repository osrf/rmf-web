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
/**
 * A wrapper to `<text>` element that attempts to fix text into a given width, ellipsing it if it
 * is too long. Unlike the `textLength` attribute, this does not "compress" or "expand" the text.
 * @param props
 */
export var SvgText = function (props) {
  var text = props.text,
    targetWidth = props.targetWidth,
    otherProps = __rest(props, ['text', 'targetWidth']);
  var callbackRef = function (textElem) {
    if (!textElem) {
      return;
    }
    // svg text does not support auto ellipses, this workaround by testing the text length and
    // truncate it bit by bit until it fits the icon. It's a bit hacky but it shouldn't be too bad
    // unless the robot name is mega long.
    for (textElem.textContent = text; textElem.getComputedTextLength() > targetWidth; ) {
      textElem.textContent = textElem.textContent.slice(0, textElem.textContent.length - 6) + '…';
    }
  };
  return React.createElement('text', __assign({ ref: callbackRef }, otherProps));
};
export default SvgText;
