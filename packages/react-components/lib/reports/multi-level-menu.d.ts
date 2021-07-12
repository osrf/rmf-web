import React from 'react';
interface MenuItemProps {
  icon?: JSX.Element;
  title: string;
  items?: {
    title: string;
    to: string;
  }[];
  onClick?: () => void;
}
export interface ExpandableMultilevelMenuProps {
  icon?: JSX.Element;
  title: string;
  items: MenuItemProps[];
  onClick?: () => void;
}
export interface MultilevelMenuProps {
  menuStructure: (ExpandableMultilevelMenuProps | MenuItemProps)[];
}
export declare const MultiLevelMenu: React.MemoExoticComponent<
  (props: MultilevelMenuProps) => React.ReactElement
>;
export {};
