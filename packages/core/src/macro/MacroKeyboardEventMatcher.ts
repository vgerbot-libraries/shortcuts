import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';

export class MacroKeyboardEventMatcher {
    constructor(
        private readonly macroPattern: string,
        readonly origin: KeyboardEventMatcher
    ) {}

    match(event: KeyboardEvent): boolean {
        return this.origin.match(event);
    }

    str(): string {
        return this.macroPattern;
    }
}
