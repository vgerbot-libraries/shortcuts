import { CaseInsensitiveKeyMatcher } from './KeyMatcher';

export class ShiftKeyMatcher extends CaseInsensitiveKeyMatcher {
    constructor() {
        super('Shift');
    }
}
