import { Shortcut } from '../../src/shortcut/Shortcut';
import '../../src/locales/default';
import { mockKeyboardEvent } from '../mocks/mockKeyboardEvent';

describe('@shortcuts/core Shortcut', () => {
    it('parser should work correctly', () => {
        const shortcut = Shortcut.from('Ctrl+Shift+A');
        const event = mockKeyboardEvent('keydown', {
            ctrlKey: true,
            shiftKey: true,
            key: 'A'
        });
        expect(shortcut.match(event)).toBeTruthy();
    });
    it('combination shortcut key should work correctly', () => {
        const shortcut = Shortcut.from('Ctrl+K,V');
        const event1 = mockKeyboardEvent('keydown', {
            ctrlKey: true,
            key: 'K'
        });
        const event2 = mockKeyboardEvent('keydown', {
            key: 'V'
        });
        expect(shortcut.match(event1)).toBeFalsy();
        expect(shortcut.match(event2)).toBeTruthy();

        expect(shortcut.match(event1)).toBeFalsy();
    });
});
