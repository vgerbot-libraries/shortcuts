import { Shortcut } from '@vgerbot/shortcuts-core';
import { Observable } from 'rxjs';

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
