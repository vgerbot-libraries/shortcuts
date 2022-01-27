import { Observable } from 'rxjs';
import { Keyboard, Shortcut } from '@shortcuts/core';
import {
    EventTargetLike,
    SelectorMethodSignature
} from 'rxjs/observable/FromEventObservable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { AddShortcutEventOptions } from '@shortcuts/core/lib/foundation/AddShortcutEventOptions';

export function shortcut(shortcutKey: string) {
    const shortcutMatcher = Shortcut.from(shortcutKey);
    return function shortcutOperatorFunction<T>(source: Observable<T>) {
        return new Observable<T>(subscriber => {
            return source.subscribe(
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
        });
    };
}

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
export function fromShortcutEvent(
    keyboard: Keyboard,
    command: string,
    options: Partial<AddShortcutEventOptions> = {}
) {
    return new Observable(subscriber => {
        return keyboard.on(
            command,
            event => {
                subscriber.next(event);
                if (options.once) {
                    subscriber.complete();
                }
            },
            options
        );
    });
}
