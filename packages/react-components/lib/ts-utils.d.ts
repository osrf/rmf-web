/**
 * Extracts the optional props that should be defined in a component's `defaultProps` property.
 *
 * This extracts all the optional properties of a given type and make them required.
 */
export declare type DefaultPropsType<T> = {
  [K2 in Exclude<
    /**
     * if `T extends Record<K, Exclude<T[K], undefined>>`, it means T[K] is NOT a optional property,
     * this works because T[K] returns the type disregarding the optional identifier.
     *
     * For example, given
     * interface Foo {
     *   bar?: string;
     * },
     * T[K] would result in `string` and NOT `string | undefined`;
     *
     * Because T[K] takes the type specified, `T extends Record<K, T[K]>` (note: without
     * the `Exclude`), given
     * interface Foo {
     *   bar: string | undefined;
     * }
     * It will return `string | undefined` and `T extends Record<K, T[K]>` would return
     * TRUE even though `bar` is technically optional.
     * So we need to extra `Exclude` to take this situation into account.
     */
    {
      [K in keyof T]: T extends Record<K, Exclude<T[K], undefined>> ? never : K;
    }[keyof T],
    undefined
  >]: T[K2];
};
