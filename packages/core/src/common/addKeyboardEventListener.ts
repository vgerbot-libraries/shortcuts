import { ShortcutEventTarget } from '../foundation/ShortcutEventTarget';
import { ShortcutKeyboardEvent } from '../foundation/ShortcutKeyboardEvent';

export function addKeyboardEventListener<T extends ShortcutEventTarget>(
    target: T,
    eventName: 'keydown' | 'keyup',
    listener: (this: T, event: ShortcutKeyboardEvent) => void,
    options: AddEventListenerOptions
) {
    target.addEventListener(eventName, listener, options);
    return () => {
        target.removeEventListener(eventName, listener, options);
    };
}
export function addKeydownEventListener<T extends ShortcutEventTarget>(
    target: T,
    listener: (this: T, event: ShortcutKeyboardEvent) => void,
    options: AddEventListenerOptions
) {
    return addKeyboardEventListener(target, 'keydown', listener, options);
}

export function addKeyupEventListener<T extends ShortcutEventTarget>(
    target: T,
    listener: (this: T, event: ShortcutKeyboardEvent) => void,
    options: AddEventListenerOptions
) {
    return addKeyboardEventListener(target, 'keyup', listener, options);
}
