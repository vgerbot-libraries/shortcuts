import { hello } from '../../src';

describe('@shortcuts/rxjs', () => {
    it('casual', () => {
        expect(hello()).toBe('world');
    })
});