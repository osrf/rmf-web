/// <reference types="react" />
export interface TooltipProps {
  title: string;
  id: string;
  enabled: boolean;
  children: JSX.Element;
}
export declare const DashboardTooltip: (props: TooltipProps) => JSX.Element;
export default DashboardTooltip;
