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
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
export default function DateAndTimePickers(props) {
  var name = props.name,
    label = props.label,
    value = props.value,
    rest = __rest(props, ['name', 'label', 'value']);
  return React.createElement(
    MuiPickersUtilsProvider,
    { utils: DateFnsUtils },
    React.createElement(
      KeyboardDateTimePicker,
      __assign(
        {
          id: name + '-datetime-local',
          value: value ? value : format(new Date(), 'MM/dd/yyyy HH:mm'),
          label: label,
          format: 'MM/dd/yyyy HH:mm',
          inputVariant: 'outlined',
          variant: 'inline',
          ampm: false,
        },
        rest,
      ),
    ),
  );
}
