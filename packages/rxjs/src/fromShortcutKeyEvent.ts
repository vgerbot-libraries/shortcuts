import {
    EventTargetLike,
    SelectorMethodSignature
} from 'rxjs/observable/FromEventObservable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { shortcut } from './shortcut';

export function fromShortcutKeyEvent<T>(
    target: EventTargetLike,
    shortcutKey: string,
    eventName: 'keydown' | 'keyup' = 'keydown',
    options: EventListenerOptions = {},
    selector?: SelectorMethodSignature<T>
) {
    if (selector) {
        return fromEvent<T>(target, eventName, options, selector).pipe(
            shortcut(shortcutKey)
        );
    }
    return fromEvent<T>(target, eventName, options).pipe(shortcut(shortcutKey));
}
