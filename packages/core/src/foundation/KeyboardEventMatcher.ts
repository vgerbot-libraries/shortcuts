import { ShortcutKeyboardEvent } from './ShortcutKeyboardEvent';

export interface KeyboardEventMatcher {
    match(event: ShortcutKeyboardEvent | KeyboardEvent): boolean;

    /**
     * @desc Help text for this matcher.
     *   The text can be displayed as a prompt on menus, buttons and other controls.
     * @returns {string}
     */
    str(): string;
}
export interface KeyboardEventMatcherFn {
    (event: ShortcutKeyboardEvent): boolean;
}
