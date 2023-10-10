import { Shortcut, ShortcutKeyboardEvent } from '@vgerbot/shortcuts';
import { Observable } from 'rxjs';

export function shortcut(shortcutKey: string) {
    const shortcutMatcher = Shortcut.from(shortcutKey);
    return function shortcutOperatorFunction<T>(source: Observable<T>) {
        return new Observable<T>(subscriber => {
            return source.subscribe(
                event => {
                    if (
                        event instanceof KeyboardEvent &&
                        shortcutMatcher.match(event as ShortcutKeyboardEvent)
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
