export function addKeyboardEventListener(
    target: HTMLElement,
    eventName: 'keydown' | 'keyup',
    listener: (this: HTMLElement, event: KeyboardEvent) => void,
    options: AddEventListenerOptions
) {
    target.addEventListener(eventName, listener, options);
    return () => {
        target.removeEventListener(eventName, listener, options);
    };
}
export function addKeydownEventListener(
    target: HTMLElement,
    listener: (this: HTMLElement, event: KeyboardEvent) => void,
    options: AddEventListenerOptions
) {
    return addKeyboardEventListener(target, 'keydown', listener, options);
}

export function addKeyupEventListener(
    target: HTMLElement,
    listener: (this: HTMLElement, event: KeyboardEvent) => void,
    options: AddEventListenerOptions
) {
    return addKeyboardEventListener(target, 'keyup', listener, options);
}
