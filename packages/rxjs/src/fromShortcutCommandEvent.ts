import { Observable } from 'rxjs';
import {
    Keyboard,
    AddShortcutEventOptions,
    ShortcutEvent
} from '@vgerbot/shortcuts';

export function fromShortcutCommandEvent(
    keyboard: Keyboard,
    command: string,
    options: Partial<AddShortcutEventOptions> = {}
) {
    return new Observable<ShortcutEvent>(subscriber => {
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
