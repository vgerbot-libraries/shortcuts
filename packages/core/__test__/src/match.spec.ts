import '../../src/locales/default';
import { match } from '../../src/pattern-matching';
import { keydownEvent } from '../mocks/mockKeyboardEvent';

describe('pattern-matching/match', () => {
    it('match.case.else', () => {
        const ctrlACallback = jest.fn();
        const ctrlCCallback = jest.fn();
        const notMatchCallback = jest.fn();

        const matcher = match
            .case('Ctrl+A', ctrlACallback)
            .case('Ctrl+C', ctrlCCallback)
            .else(notMatchCallback);

        matcher(
            keydownEvent({
                ctrlKey: true,
                key: 'A'
            })
        );

        expect(ctrlACallback).toBeCalled();

        matcher(
            keydownEvent({
                ctrlKey: true,
                shiftKey: true,
                key: 'C'
            })
        );

        expect(ctrlCCallback).not.toBeCalled();

        expect(notMatchCallback).toBeCalled();
    });
    it('match(pattern, handler)', () => {
        const callback = jest.fn();
        const matcher = match('Ctrl+A', callback);

        matcher(
            keydownEvent({
                ctrlKey: true,
                key: 'A'
            })
        );

        expect(callback).toBeCalled();
    });
    it('match()()...', () => {
        const ctrlACallback = jest.fn();
        const ctrlCCallback = jest.fn();
        const ctrlShiftCCallback = jest.fn();
        const notMatchCallback = jest.fn();

        const matcher = match('Ctrl+A', ctrlACallback)('Ctrl+C', ctrlCCallback)(
            'Ctrl+Shift+C',
            ctrlShiftCCallback
        ).else(notMatchCallback);

        matcher(
            keydownEvent({
                ctrlKey: true,
                key: 'A'
            })
        );

        expect(ctrlACallback).toBeCalled();
        expect(ctrlCCallback).not.toBeCalled();
        expect(ctrlShiftCCallback).not.toBeCalled();
        expect(notMatchCallback).not.toBeCalled();

        matcher(
            keydownEvent({
                ctrlKey: true,
                shiftKey: true,
                key: 'C'
            })
        );

        expect(ctrlShiftCCallback).toBeCalled();
        expect(ctrlCCallback).not.toBeCalled();
        expect(notMatchCallback).not.toBeCalled();

        matcher(
            keydownEvent({
                ctrlKey: true,
                shiftKey: true,
                key: 'D'
            })
        );

        expect(notMatchCallback).toBeCalled();
    });
});
