import { Shortcut } from '../../src';

describe('@vgerbot/shortcuts', () => {
    it('casual', () => {
        expect(Shortcut.from('Ctrl+Shift+A')).toBeDefined();
    });
});
