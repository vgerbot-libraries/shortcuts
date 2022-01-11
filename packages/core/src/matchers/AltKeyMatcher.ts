import { CaseInsensitiveKeyMatcher } from './KeyMatcher';

export class AltKeyMatcher extends CaseInsensitiveKeyMatcher {
    constructor() {
        super('Alt');
    }
}
