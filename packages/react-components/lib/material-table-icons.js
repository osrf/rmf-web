/**
 * Importing named exports in this way will result in the code for every icon being included in your project. https://www.npmjs.com/package/material-table
 * If this is not done, the icons in the MaterialTable component will not appear
 */
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
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
export var materialTableIcons = {
  Add: React.forwardRef(function (props, ref) {
    return React.createElement(AddBox, __assign({}, props, { ref: ref }));
  }),
  Check: React.forwardRef(function (props, ref) {
    return React.createElement(Check, __assign({}, props, { ref: ref }));
  }),
  Clear: React.forwardRef(function (props, ref) {
    return React.createElement(Clear, __assign({}, props, { ref: ref }));
  }),
  Delete: React.forwardRef(function (props, ref) {
    return React.createElement(DeleteOutline, __assign({}, props, { ref: ref }));
  }),
  DetailPanel: React.forwardRef(function (props, ref) {
    return React.createElement(ChevronRight, __assign({}, props, { ref: ref }));
  }),
  Edit: React.forwardRef(function (props, ref) {
    return React.createElement(Edit, __assign({}, props, { ref: ref }));
  }),
  Export: React.forwardRef(function (props, ref) {
    return React.createElement(SaveAlt, __assign({}, props, { ref: ref }));
  }),
  Filter: React.forwardRef(function (props, ref) {
    return React.createElement(FilterList, __assign({}, props, { ref: ref }));
  }),
  FirstPage: React.forwardRef(function (props, ref) {
    return React.createElement(FirstPage, __assign({}, props, { ref: ref }));
  }),
  LastPage: React.forwardRef(function (props, ref) {
    return React.createElement(LastPage, __assign({}, props, { ref: ref }));
  }),
  NextPage: React.forwardRef(function (props, ref) {
    return React.createElement(ChevronRight, __assign({}, props, { ref: ref }));
  }),
  PreviousPage: React.forwardRef(function (props, ref) {
    return React.createElement(ChevronLeft, __assign({}, props, { ref: ref }));
  }),
  ResetSearch: React.forwardRef(function (props, ref) {
    return React.createElement(Clear, __assign({}, props, { ref: ref }));
  }),
  Search: React.forwardRef(function (props, ref) {
    return React.createElement(Search, __assign({}, props, { ref: ref }));
  }),
  SortArrow: React.forwardRef(function (props, ref) {
    return React.createElement(ArrowDownward, __assign({}, props, { ref: ref }));
  }),
  ThirdStateCheck: React.forwardRef(function (props, ref) {
    return React.createElement(Remove, __assign({}, props, { ref: ref }));
  }),
  ViewColumn: React.forwardRef(function (props, ref) {
    return React.createElement(ViewColumn, __assign({}, props, { ref: ref }));
  }),
};
