import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';

class KeyMatcher implements KeyboardEventMatcher {
    constructor(
        private readonly key: string,
        private readonly caseSensitive: boolean
    ) {}
    match(event: KeyboardEvent): boolean {
        if (this.caseSensitive) {
            return event.key === this.key;
        }
        return event.key.toLowerCase() === this.key;
    }
}
export class CaseInsensitiveKeyMatcher extends KeyMatcher {
    constructor(key: string) {
        super(key.toLowerCase(), false);
    }
}

export class CaseSensitiveKeyMatcher extends KeyMatcher {
    constructor(key: string) {
        super(key, true);
    }
}
