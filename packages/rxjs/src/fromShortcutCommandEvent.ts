import { Observable } from 'rxjs';
import { Keyboard, AddShortcutEventOptions } from '@vgerbot/shortcuts-core';

export function fromShortcutCommandEvent(
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
