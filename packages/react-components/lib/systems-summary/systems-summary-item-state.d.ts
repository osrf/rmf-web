/// <reference types="react" />
export interface ItemSummary<T = unknown> {
  operational: number;
  spoiltItem: T[];
}
export interface SystemSummaryItemStateProps {
  item: string;
  itemSummary: ItemSummary;
  onClick?: () => void;
}
export declare const SystemSummaryItemState: (props: SystemSummaryItemStateProps) => JSX.Element;
