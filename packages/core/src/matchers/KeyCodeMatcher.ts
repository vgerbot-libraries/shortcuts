import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';
import { ShortcutKeyboardEvent } from '../foundation/ShortcutKeyboardEvent';

export class KeyCodeMatcher implements KeyboardEventMatcher {
    constructor(private readonly keyCode: number) {}
    match(event: ShortcutKeyboardEvent): boolean {
        return event.keyCode === this.keyCode;
    }

    str(): string {
        return '';
    }
}
