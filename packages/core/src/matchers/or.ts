import {
    KeyboardEventMatcher,
    KeyboardEventMatcherFn
} from '../foundation/KeyboardEventMatcher';

export function or(
    ...matchers: Array<KeyboardEventMatcher | KeyboardEventMatcherFn>
): KeyboardEventMatcherFn {
    return (keyboardEvent: KeyboardEvent) => {
        return matchers.some(it => {
            if (typeof it === 'function') {
                return it(keyboardEvent);
            } else {
                return it.match(keyboardEvent);
            }
        });
    };
}
