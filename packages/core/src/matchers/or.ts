import {
    KeyboardEventMatcher,
    KeyboardEventMatcherFn
} from '../foundation/KeyboardEventMatcher';
import { ShortcutKeyboardEvent } from '../foundation/ShortcutKeyboardEvent';

export function or(
    ...matchers: Array<KeyboardEventMatcher | KeyboardEventMatcherFn>
): KeyboardEventMatcherFn {
    return (keyboardEvent: ShortcutKeyboardEvent) => {
        return matchers.some(it => {
            if (typeof it === 'function') {
                return it(keyboardEvent);
            } else {
                return it.match(keyboardEvent);
            }
        });
    };
}
