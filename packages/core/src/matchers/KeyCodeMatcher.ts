import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';

export class KeyCodeMatcher implements KeyboardEventMatcher {
    constructor(private readonly keyCode: number) {}
    match(event: KeyboardEvent): boolean {
        return event.keyCode === this.keyCode;
    }
}
