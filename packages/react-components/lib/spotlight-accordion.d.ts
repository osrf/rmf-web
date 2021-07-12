import { AccordionProps } from '@material-ui/core';
import React from 'react';
declare type ManagedProps = 'onChange' | 'expanded';
export interface SpotlightHandle {
  spotlight(): void;
}
export declare type SpotlightAccordionProps<P extends OptionalChildren<AccordionProps>> = Omit<
  P,
  ManagedProps
>;
declare type OptionalChildren<T extends React.PropsWithChildren<unknown>> = Omit<T, 'children'> & {
  children?: T['children'];
};
/**
 * Given an Accordion component, add support for putting it on "spotlight". This customize the
 * component so that it returns a ref with a `spotlight` method. Calling that method will scroll
 * the component into view and expand it.
 *
 * This overrides the `onChange` and `expanded` props so those are removed from the public interface.
 * @param BaseAccordion
 */
export declare function withSpotlight<P extends OptionalChildren<AccordionProps>>(
  BaseAccordion: React.ComponentType<P>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<SpotlightAccordionProps<P>> & React.RefAttributes<SpotlightHandle>
>;
export interface SpotlightRef {
  ref: React.RefCallback<SpotlightHandle>;
  spotlight: () => void;
}
/**
 * Allows a spotlight to be called even when the component is not mounted. The spotlight will be
 * deferred until the component is mounted.
 */
export declare function createSpotlightRef(): SpotlightRef;
export declare function useSpotlightRef(): React.MutableRefObject<SpotlightRef>;
export {};
