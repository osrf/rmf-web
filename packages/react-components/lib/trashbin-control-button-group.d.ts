import React from 'react';
export interface TrashBinControlButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  disableReset?: boolean;
  disableClear?: boolean;
  disableRestore?: boolean;
  disableSave?: boolean;
  showReset?: boolean;
  showClear?: boolean;
  showRestore?: boolean;
  showSave?: boolean;
  onResetClick?: () => void;
  onClearClick?: () => void;
  onRestoreClick?: () => void;
  onSaveClick?: () => void;
  fullWidth?: boolean;
}
/**
 * @param disableReset disable reset button.
 * @param disableClear disable clear button.
 * @param disableRestore disable restore button.
 * @param disableSave disable save button.
 * @param showReset shows reset button. Default value `true`.
 * @param showClear shows clear button. Default value `true`.
 * @param showRestore shows restore button. Default value `true`.
 * @param showSave shows show button. Default value `true`.
 * @param onResetClick handle the click event on the reset button.
 * @param onClearClick handle the click event on the clear button.
 * @param onRestoreClick handle the click event on the restore button.
 * @param onSaveClick handle the click event on the save button.
 * @param fullWidth set property full width. Default value `true`.
 */
export declare const TrashBinControlButtonGroup: React.ForwardRefExoticComponent<
  TrashBinControlButtonGroupProps & React.RefAttributes<HTMLDivElement>
>;
export default TrashBinControlButtonGroup;
