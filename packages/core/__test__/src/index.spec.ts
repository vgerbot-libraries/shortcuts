import { Shortcut } from '../../src';

describe('@shortcuts/core', () => {
    it('casual', () => {
        expect(Shortcut.from('Ctrl+Shift+A')).toBeDefined();
    });
});
