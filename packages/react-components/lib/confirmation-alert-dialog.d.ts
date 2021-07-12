/// <reference types="react" />
import { AlertDialogProps } from './alert-dialog';
export interface ConfirmationAlertDialogProps extends Omit<AlertDialogProps, 'title' | 'variant'> {
  title?: string;
}
/**
 * A specialized `AlertDialog` for confirmation messages.
 */
export declare const ConfirmationAlertDialog: (props: ConfirmationAlertDialogProps) => JSX.Element;
export default ConfirmationAlertDialog;
