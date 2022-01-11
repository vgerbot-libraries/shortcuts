import { CaseInsensitiveKeyMatcher } from './KeyMatcher';

export class MetaKeyMatcher extends CaseInsensitiveKeyMatcher {
    constructor(key: 'OS' | 'Meta' | 'Super' | 'Hyper') {
        super(key);
    }
}
