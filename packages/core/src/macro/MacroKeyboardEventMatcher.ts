import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';

export class MacroKeyboardEventMatcher {
    constructor(
        private readonly user_friendly_str: string,
        readonly origin: KeyboardEventMatcher
    ) {}

    match(event: KeyboardEvent): boolean {
        return this.origin.match(event);
    }

    str(): string {
        return this.user_friendly_str;
    }
}
