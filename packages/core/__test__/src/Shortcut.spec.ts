import { Shortcut } from '../../src';
import '../../src/locales/default';
import { keydownEvent, mockKeyboardEvent } from '../mocks/mockKeyboardEvent';

describe('Shortcut', () => {
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
    it('should detect mismatched shortcut keys correctly', () => {
        const shortcut = Shortcut.from('Ctrl+C');
        const keyA = mockKeyboardEvent('keydown', {
            key: 'A'
        });
        expect(shortcut.match(keyA)).toBeFalsy();

        const combinedShortcut = Shortcut.from('Ctrl+K,P');

        const ctrkK = mockKeyboardEvent('keydown', {
            ctrlKey: true,
            key: 'K'
        });
        expect(combinedShortcut.match(ctrkK)).toBeTruthy();

        expect(combinedShortcut.match(keyA)).toBeFalsy();
    });
    it('should match modifiers correctly', () => {
        const ctrl = Shortcut.from('Ctrl');
        const shift = Shortcut.from('Shift');
        const alt = Shortcut.from('Alt');
        const meta = Shortcut.from('Meta');

        const ctrlKey = keydownEvent({
            ctrlKey: true
        });
        const shiftKey = keydownEvent({
            shiftKey: true
        });
        const altKey = keydownEvent({
            altKey: true
        });
        const metaKey = keydownEvent({
            metaKey: true
        });

        expect(ctrl.match(ctrlKey)).toBeTruthy();
        expect(ctrl.match(shiftKey)).toBeFalsy();
        expect(ctrl.match(altKey)).toBeFalsy();
        expect(ctrl.match(metaKey)).toBeFalsy();

        expect(shift.match(shiftKey)).toBeTruthy();
        expect(shift.match(ctrlKey)).toBeFalsy();
        expect(shift.match(altKey)).toBeFalsy();
        expect(shift.match(metaKey)).toBeFalsy();

        expect(alt.match(altKey)).toBeTruthy();
        expect(alt.match(shiftKey)).toBeFalsy();
        expect(alt.match(ctrlKey)).toBeFalsy();
        expect(alt.match(metaKey)).toBeFalsy();

        expect(meta.match(metaKey)).toBeTruthy();
        expect(meta.match(shiftKey)).toBeFalsy();
        expect(meta.match(altKey)).toBeFalsy();
        expect(meta.match(ctrlKey)).toBeFalsy();

        const ctrlCShortcut = Shortcut.from('Ctrl+C');

        expect(
            ctrlCShortcut.match(
                keydownEvent({
                    ctrlKey: true,
                    shiftKey: true,
                    key: 'C'
                })
            )
        ).toBeFalsy();
    });
    it('stringify', () => {
        expect(Shortcut.from('Ctrl+Shift+A').str()).toBe('Ctrl+Shift+A');
        expect(Shortcut.from('Ctrl+A,Ctrl+B').str()).toBe('Ctrl+A,Ctrl+B');

        const shortcut = Shortcut.from('Ctrl+A,Ctrl+B');

        expect(shortcut.partiallyMatchesStr()).toBe('');

        shortcut.match(
            keydownEvent({
                ctrlKey: true,
                key: 'A'
            })
        );

        expect(shortcut.partiallyMatchesStr()).toBe('Ctrl+A');

        shortcut.match(
            keydownEvent({
                ctrlKey: true,
                key: 'B'
            })
        );
        expect(shortcut.partiallyMatchesStr()).toBe('Ctrl+A,Ctrl+B');
    });
});
