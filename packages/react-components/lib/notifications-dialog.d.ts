/// <reference types="react" />
export interface Notification {
  id: number;
  time: string;
  error: string;
  severity: Severity;
}
export interface NotificationDialogProps {
  showNotificationsDialog: boolean;
  onClose: () => void;
  notifications: Notification[];
  onNotificationsDismiss?: (id: number) => void;
}
export declare enum Severity {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}
export declare const NotificationsDialog: (props: NotificationDialogProps) => JSX.Element;
