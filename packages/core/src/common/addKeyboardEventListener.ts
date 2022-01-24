import { ShortcutEventTarget } from '../foundation/ShortcutEventTarget';

export function addKeyboardEventListener<
    T extends ShortcutEventTarget = HTMLElement
>(
    target: T,
    eventName: 'keydown' | 'keyup',
    listener: (this: T, event: KeyboardEvent) => void,
    options: AddEventListenerOptions
) {
    type EventListenerFn = (this: T, evt: Event) => void;
    target.addEventListener(eventName, listener as EventListenerFn, options);
    return () => {
        target.removeEventListener(
            eventName,
            listener as EventListenerFn,
            options
        );
    };
}
export function addKeydownEventListener<
    T extends ShortcutEventTarget = HTMLElement
>(
    target: T,
    listener: (this: T, event: KeyboardEvent) => void,
    options: AddEventListenerOptions
) {
    return addKeyboardEventListener(target, 'keydown', listener, options);
}

export function addKeyupEventListener<
    T extends ShortcutEventTarget = HTMLElement
>(
    target: T,
    listener: (this: T, event: KeyboardEvent) => void,
    options: AddEventListenerOptions
) {
    return addKeyboardEventListener(target, 'keyup', listener, options);
}
