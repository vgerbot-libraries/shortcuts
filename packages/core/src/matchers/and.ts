import {
    KeyboardEventMatcher,
    KeyboardEventMatcherFn
} from '../foundation/KeyboardEventMatcher';
import { ShortcutKeyboardEvent } from '../foundation/ShortcutKeyboardEvent';

export function and(
    ...matchers: Array<KeyboardEventMatcher | KeyboardEventMatcherFn>
) {
    return (keyboardEvent: ShortcutKeyboardEvent) => {
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
