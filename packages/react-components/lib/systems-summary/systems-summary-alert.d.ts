/// <reference types="react" />
import { Notification } from '../index';
export interface SystemSummaryAlertProps {
  notifications: Notification[];
  onNotificationsDismiss: (id: number) => void;
}
export declare const SystemSummaryAlert: (props: SystemSummaryAlertProps) => JSX.Element;
