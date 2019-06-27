/**
 * If data provider is an array each item is passed to callback, but if an object map then each key/pair are
 * passed to callback. here the key is the description and value the data.
 */
export type UsingProviderType<TType> = TType[] | { [desc: string]: TType };

/**
 * Defines a data provider function.
 */
export type UsingProviderFunc<TType> = () => UsingProviderType<TType>;

/**
 * Defines a data provider as either a function or literal value.
 */
export type UsingProvider<TType> = UsingProviderFunc<TType> | UsingProviderType<TType>;

/**
 * Defines the type of callback
 */
export type UsingCallback<TType> = (data: TType, desc?: string) => void;

/**
 * Defines a provider function for testing. The data provider can be a function, an array or object.
 *
 * ```typescript
 * using([1,2,3,4], data => {
 *    console.log(data); // prints each value on a new line
 * });
 *
 * using({'Person': 'John'}, (data, desc) => {
 *     console.log(`${desc}: ${data}`); // prints "Person: Jogn"
 * }
 *
 * using(() => ([1,2,3]), data => {
 *     console.log(data); // prints each value on a new line
 * }
 * ```
 */
export function using<TType>(provider: UsingProvider<TType>, cb: UsingCallback<TType>) {
    if (typeof provider === 'function') {
        return using(provider(), cb);
    } else if (provider instanceof Array) {
        return using(provider.reduce((acc, next, indx) => (acc[indx + ''] = next), {}), cb);
    } else if (typeof provider === 'object') {
        Object.entries(provider).forEach(([desc, value]) => cb(value, desc));
    } else {
        throw new Error('Bad argument, using requires array, object or function');
    }
}
