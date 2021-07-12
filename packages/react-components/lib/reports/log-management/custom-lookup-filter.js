import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';
import React from 'react';
var ITEM_HEIGHT = 48;
var ITEM_PADDING_TOP = 8;
var MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
/**
 * Component created to override the default lookup filter.
 */
export var CustomLookupFilterParser = function (props) {
  var columnDefRaw = props.columnDef,
    onFilterChanged = props.onFilterChanged;
  /**
   * The column type in the material-table library it's not working correctly. So as a workaround I'm assigning the types to the properties need it in this component.
   */
  var columnDef = columnDefRaw;
  return React.createElement(CustomLookupFilter, {
    tableId: columnDef.tableData.id,
    filterValue: columnDef.tableData.filterValue,
    filterOnItemSelect: columnDef.filterOnItemSelect,
    onFilterChanged: onFilterChanged,
    lookup: columnDef.lookup,
  });
};
export var CustomLookupFilter = function (props) {
  var tableId = props.tableId,
    filterValue = props.filterValue,
    filterOnItemSelect = props.filterOnItemSelect,
    onFilterChanged = props.onFilterChanged,
    lookup = props.lookup;
  var _a = React.useState(filterValue || []),
    selectedFilter = _a[0],
    setSelectedFilter = _a[1];
  React.useEffect(
    function () {
      setSelectedFilter(filterValue || []);
    },
    [filterValue],
  );
  return React.createElement(
    FormControl,
    { style: { width: '100%' } },
    React.createElement(InputLabel, {
      htmlFor: 'select-multiple-checkbox' + tableId,
      style: { marginTop: -16 },
    }),
    React.createElement(
      Select,
      {
        multiple: true,
        value: selectedFilter,
        onClose: function () {
          if (filterOnItemSelect !== true) onFilterChanged(tableId.toString(), selectedFilter);
        },
        onChange: function (event) {
          setSelectedFilter(event.target.value);
          if (filterOnItemSelect === true) onFilterChanged(tableId.toString(), event.target.value);
        },
        input: React.createElement(Input, { id: 'select-multiple-checkbox' + tableId }),
        renderValue: function (selecteds) {
          return selecteds
            .map(function (selected) {
              return lookup[selected];
            })
            .join(', ');
        },
        MenuProps: MenuProps,
        style: { marginTop: 0 },
      },
      Object.keys(lookup).map(function (key) {
        return React.createElement(
          MenuItem,
          { key: key, value: key },
          React.createElement(Checkbox, { checked: selectedFilter.indexOf(key.toString()) > -1 }),
          React.createElement(ListItemText, { primary: lookup[key] }),
        );
      }),
    ),
  );
};
