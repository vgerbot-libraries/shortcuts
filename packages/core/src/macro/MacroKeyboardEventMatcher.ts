import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';
import { ShortcutKeyboardEvent } from '../foundation/ShortcutKeyboardEvent';

export class MacroKeyboardEventMatcher {
    constructor(
        private readonly label: string,
        readonly origin: KeyboardEventMatcher
    ) {}

    match(event: ShortcutKeyboardEvent): boolean {
        return this.origin.match(event);
    }

    str(): string {
        return this.label;
    }
}
