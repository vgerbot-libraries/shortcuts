import { Observable } from 'rxjs';
import { Shortcut } from '@shortcuts/core';
import {
    EventTargetLike,
    SelectorMethodSignature
} from 'rxjs/observable/FromEventObservable';
import { fromEvent } from 'rxjs/observable/fromEvent';

export function shortcut(shortcutKey: string) {
    const shortcutMatcher = Shortcut.from(shortcutKey);
    return function shortcutOperatorFunction<T>(source: Observable<T>) {
        return new Observable<T>(subscriber => {
            const subscription = source.subscribe(
                event => {
                    if (
                        event instanceof KeyboardEvent &&
                        shortcutMatcher.match(event)
                    ) {
                        subscriber.next(event);
                    }
                },
                err => subscriber.error(err),
                () => subscriber.complete()
            );
            return subscription;
        });
    };
}

export function fromShortcutEvent<T>(
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
