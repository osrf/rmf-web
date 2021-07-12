/// <reference types="react" />
export interface StatusLabelProps {
  /**
   * The text to show on the label. Because the label has a fixed width, the string should not
   * have more than 6-9 characters, depending on the font and character width.
   */
  text?: string;
  className?: string;
  /**
   * Defaults to `normal`.
   *
   * The `unknown` variant should be used when displaying an unknown status. When using the
   * `unknown` variant, the `borderColor` css and `text` props are ignored.
   */
  variant?: 'normal' | 'unknown';
}
export declare const StatusLabel: (props: StatusLabelProps) => JSX.Element;
