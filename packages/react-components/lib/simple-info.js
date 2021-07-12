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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { joinClasses } from './css-utils';
var useStyles = makeStyles(function (theme) {
  return {
    container: {
      display: 'table',
      borderCollapse: 'collapse',
      width: '100%',
      overflowX: 'auto',
    },
    tableRow: {
      display: 'table-row',
    },
    displayName: {
      display: 'table-cell',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
      borderTop: '1px solid',
      borderTopColor: theme.palette.divider,
      background: theme.palette.action.hover,
      padding: theme.spacing(0.25, 2),
      width: '30%',
    },
    value: {
      display: 'table-cell',
      textAlign: 'end',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
      borderTop: '1px solid',
      borderTopColor: theme.palette.divider,
      padding: theme.spacing(0.25, 2),
    },
    arrayListItem: {
      justifyContent: 'flex-end',
    },
    arrayItemValue: {
      textAlign: 'end',
    },
    disabled: {
      color: theme.palette.action.disabled,
    },
  };
});
export var SimpleInfo = function (props) {
  var infoData = props.infoData,
    overrideStyle = props.overrideStyle,
    otherProps = __rest(props, ['infoData', 'overrideStyle']);
  var classes = useStyles();
  var renderPrimitive = function (_a) {
    var name = _a.name,
      value = _a.value,
      className = _a.className,
      disabled = _a.disabled,
      wrap = _a.wrap;
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        Typography,
        { className: classes.displayName, variant: 'body1', role: 'rowheader' },
        name,
      ),
      React.createElement(
        Typography,
        {
          noWrap: !wrap,
          variant: 'body1',
          className: joinClasses(
            (className === null || className === void 0 ? void 0 : className.overrideValue)
              ? className === null || className === void 0
                ? void 0
                : className.overrideValue
              : classes.value,
            disabled ? classes.disabled : undefined,
            className === null || className === void 0 ? void 0 : className.value,
          ),
          role: 'cell',
        },
        value,
      ),
    );
  };
  var renderArray = function (_a) {
    var name = _a.name,
      value = _a.value,
      className = _a.className,
      disabled = _a.disabled;
    var arrayItemValueStyle = (
      className === null || className === void 0 ? void 0 : className.overrideArrayItemValue
    )
      ? className === null || className === void 0
        ? void 0
        : className.overrideArrayItemValue
      : classes.arrayItemValue;
    var valueStyle = (className === null || className === void 0 ? void 0 : className.overrideValue)
      ? className === null || className === void 0
        ? void 0
        : className.overrideValue
      : classes.value;
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        Typography,
        { className: classes.displayName, variant: 'body1', role: 'rowheader' },
        name,
      ),
      React.createElement(
        List,
        { className: valueStyle, dense: true, role: 'cell' },
        value.map(function (item, i) {
          return React.createElement(
            ListItem,
            { key: i, className: classes.arrayListItem },
            React.createElement(
              Typography,
              {
                variant: 'body1',
                className: joinClasses(
                  arrayItemValueStyle,
                  disabled ? classes.disabled : undefined,
                  Array.isArray(
                    className === null || className === void 0 ? void 0 : className.value,
                  )
                    ? className === null || className === void 0
                      ? void 0
                      : className.value[i]
                    : className === null || className === void 0
                    ? void 0
                    : className.value,
                ),
              },
              item,
            ),
          );
        }),
      ),
    );
  };
  var renderLine = function (data) {
    switch (typeof data.value) {
      case 'object':
        if (Array.isArray(data.value)) {
          return renderArray(data);
        } else {
          throw Error('nested object is not supported');
        }
        break;
      case 'function':
      case 'symbol':
        break;
      default:
        return renderPrimitive(data);
    }
  };
  return React.createElement(
    'div',
    __assign({}, otherProps),
    React.createElement(
      'div',
      {
        className: (
          overrideStyle === null || overrideStyle === void 0 ? void 0 : overrideStyle.container
        )
          ? overrideStyle === null || overrideStyle === void 0
            ? void 0
            : overrideStyle.container
          : classes.container,
        role: 'table',
      },
      infoData.map(function (item) {
        return React.createElement(
          React.Fragment,
          { key: item.name },
          React.createElement(
            'div',
            {
              className: (
                overrideStyle === null || overrideStyle === void 0 ? void 0 : overrideStyle.tableRow
              )
                ? overrideStyle === null || overrideStyle === void 0
                  ? void 0
                  : overrideStyle.tableRow
                : classes.tableRow,
              role: 'row',
              'aria-label': item.name,
            },
            renderLine(item),
          ),
        );
      }),
    ),
  );
};
