import {
    KeyboardEventMatcher,
    KeyboardEventMatcherFn
} from '../foundation/KeyboardEventMatcher';

export function and(
    ...matchers: Array<KeyboardEventMatcher | KeyboardEventMatcherFn>
) {
    return (keyboardEvent: KeyboardEvent) => {
        return (
            matchers.length > 0 &&
            matchers.every(it => {
                if (typeof it === 'function') {
                    return it(keyboardEvent);
                } else {
                    return it.match(keyboardEvent);
                }
            })
        );
    };
}
