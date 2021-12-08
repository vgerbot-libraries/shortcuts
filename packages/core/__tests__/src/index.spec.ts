import { Shortcut } from '../../src/shortcut/Shortcut';

describe('@shortcuts/core', () => {
    it('casual', () => {
        expect(Shortcut.from('Ctrl+Shift+A')).toBeDefined();
    })
})