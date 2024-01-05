import {
    EventTargetLike,
    SelectorMethodSignature
} from 'rxjs/observable/FromEventObservable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { shortcut } from './shortcut';

export function fromShortcutKeyEvent<T>(
    target: EventTargetLike,
    shortcutKey: string,
    options?: {
        eventListenerOptions?: EventListenerOptions | boolean;
        eventName?: 'keydown' | 'keyup';
        selector?: SelectorMethodSignature<T>;
    }
) {
    const { eventListenerOptions, eventName, selector } = Object.assign(
        {
            eventListenerOptions: {},
            eventName: 'keydown'
        },
        options || {}
    );
    if (selector) {
        return fromEvent<T>(
            target,
            eventName,
            eventListenerOptions,
            selector
        ).pipe(shortcut(shortcutKey));
    }
    return fromEvent<T>(target, eventName, eventListenerOptions).pipe(
        shortcut(shortcutKey)
    );
}
