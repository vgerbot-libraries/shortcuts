import { Shortcut } from '../../src';

describe('@vgerbot/shortcuts-core', () => {
    it('casual', () => {
        expect(Shortcut.from('Ctrl+Shift+A')).toBeDefined();
    });
});
