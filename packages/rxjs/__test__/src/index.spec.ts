import { fromShortcutEvent, shortcut } from '../../src';
import { mockKeyboardEvent } from '@shortcuts/core/__test__/mocks/mockKeyboardEvent';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { take } from 'rxjs/operators';

describe('@shortcuts/rxjs', () => {
    const event = mockKeyboardEvent('keydown', {
        key: 'Enter'
    });
    it('shortcut operator', async () => {
        const promise = fromEvent<KeyboardEvent>(document.body, 'keydown')
            .pipe(shortcut('Enter'))
            .pipe(take(1))
            .toPromise();
        document.body.dispatchEvent(event);

        await promise;
    });
    it('fromShortcutEvent should work correctly', async () => {
        const promise = fromShortcutEvent(document.body, 'Enter')
            .pipe(take(1))
            .toPromise();

        document.body.dispatchEvent(event);

        await promise;
    });
    it('fromShortcutEvent selector should be called', async () => {
        const selector = jest.fn().mockReturnValue(event);

        const promise = fromShortcutEvent(
            document.body,
            'Enter',
            'keydown',
            {},
            selector
        )
            .pipe(take(1))
            .toPromise();

        document.body.dispatchEvent(event);
        await promise;

        expect(selector).toHaveBeenCalledTimes(1);
    });
});
