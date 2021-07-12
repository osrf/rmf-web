import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
var ListItemBody = function (props) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(ListItemIcon, null, props.icon),
    React.createElement(ListItemText, { primary: props.title }),
  );
};
var MenuItem = React.memo(function (props) {
  return React.createElement(
    ListItem,
    { button: true, onClick: props.onClick },
    React.createElement(ListItemBody, { icon: props.icon, title: props.title }),
  );
});
var ExpandableMenuItem = function (props) {
  var items = props.items,
    icon = props.icon,
    title = props.title;
  var _a = useState(false),
    open = _a[0],
    setOpen = _a[1];
  var handleClick = function () {
    setOpen(!open);
  };
  return React.createElement(
    'div',
    null,
    React.createElement(
      ListItem,
      { button: true, onClick: handleClick },
      React.createElement(ListItemBody, { icon: icon, title: title }),
      open ? React.createElement(ExpandLess, null) : React.createElement(ExpandMore, null),
    ),
    React.createElement(
      Collapse,
      { in: open, timeout: 'auto', unmountOnExit: true },
      React.createElement(MultiLevelMenu, { menuStructure: items }),
    ),
  );
};
export var MultiLevelMenu = React.memo(function (props) {
  var createList = function (items) {
    var menu = [];
    items.map(function (menuItem) {
      // If it has children's
      if (Array.isArray(menuItem.items) && menuItem.items.length > 0) {
        menu.push(
          React.createElement(ExpandableMenuItem, {
            icon: menuItem.icon,
            title: menuItem.title,
            items: menuItem.items,
            key: menuItem.title,
          }),
        );
      } else {
        menu.push(
          React.createElement(MenuItem, {
            icon: menuItem.icon,
            title: menuItem.title,
            key: menuItem.title,
            onClick: menuItem.onClick,
          }),
        );
      }
    });
    return menu.concat();
  };
  return React.createElement(List, null, createList(props.menuStructure));
});
