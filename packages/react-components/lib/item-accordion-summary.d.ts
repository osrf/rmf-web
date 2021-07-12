/// <reference types="react" />
import { StatusLabelProps } from './status-label';
export interface ItemAccordionSummaryProps {
  title: string;
  classes?: {
    title?: string;
  };
  statusProps?: StatusLabelProps;
}
export declare const ItemAccordionSummary: (props: ItemAccordionSummaryProps) => JSX.Element;
export default ItemAccordionSummary;
