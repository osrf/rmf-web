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
/**
 * Given an Accordion component, add support for putting it on "spotlight". This customize the
 * component so that it returns a ref with a `spotlight` method. Calling that method will scroll
 * the component into view and expand it.
 *
 * This overrides the `onChange` and `expanded` props so those are removed from the public interface.
 * @param BaseAccordion
 */
export function withSpotlight(BaseAccordion) {
  return React.forwardRef(function (props, ref) {
    var _a = React.useState(false),
      expanded = _a[0],
      setExpanded = _a[1];
    var innerRef = React.useRef();
    React.useImperativeHandle(ref, function () {
      return {
        spotlight: function () {
          var _a;
          setExpanded(true);
          (_a = innerRef.current) === null || _a === void 0
            ? void 0
            : _a.scrollIntoView({ behavior: 'smooth' });
        },
      };
    });
    return React.createElement(
      BaseAccordion,
      __assign(
        {
          expanded: expanded,
          onChange: function (_, newExpanded) {
            return setExpanded(newExpanded);
          },
        },
        props,
      ),
      props.children,
    );
  });
}
/**
 * Allows a spotlight to be called even when the component is not mounted. The spotlight will be
 * deferred until the component is mounted.
 */
export function createSpotlightRef() {
  var ref = {
    current: null,
  };
  var spotlightDefer = {
    current: false,
  };
  var doSpotlight = function () {
    if (ref.current) {
      ref.current.spotlight();
    } else {
      spotlightDefer.current = true;
    }
  };
  var refCb = function (newRef) {
    if (spotlightDefer.current) {
      newRef === null || newRef === void 0 ? void 0 : newRef.spotlight();
      spotlightDefer.current = false;
    }
    ref.current = newRef;
  };
  return { ref: refCb, spotlight: doSpotlight };
}
export function useSpotlightRef() {
  return React.useRef(createSpotlightRef());
}
