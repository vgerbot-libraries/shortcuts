import { Shortcut } from '../../src';
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
        for (let i = 0; i < 2; i++) {
            expect(shortcut.match(event1)).toBeTruthy();
            expect(shortcut.isPartMatch()).toBeTruthy();
            expect(shortcut.isFullMatch()).toBeFalsy();
            expect(shortcut.match(event2)).toBeTruthy();
            expect(shortcut.isPartMatch()).toBeFalsy();
            expect(shortcut.isFullMatch()).toBeTruthy();
        }
    });
});
