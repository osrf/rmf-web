import React from 'react';
export interface SvgTextProps extends React.SVGProps<SVGTextElement> {
  text: string;
  targetWidth: number;
}
/**
 * A wrapper to `<text>` element that attempts to fix text into a given width, ellipsing it if it
 * is too long. Unlike the `textLength` attribute, this does not "compress" or "expand" the text.
 * @param props
 */
export declare const SvgText: (props: SvgTextProps) => JSX.Element;
export default SvgText;
