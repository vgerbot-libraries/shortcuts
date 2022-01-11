import { CaseInsensitiveKeyMatcher } from './KeyMatcher';

export class CtrlKeyMatcher extends CaseInsensitiveKeyMatcher {
    constructor() {
        super('Control');
    }
}
