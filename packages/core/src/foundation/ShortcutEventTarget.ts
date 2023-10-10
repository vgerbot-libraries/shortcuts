import { ShortcutKeyboardEvent } from './ShortcutKeyboardEvent';

export type ShortcutEventTarget = {
    addEventListener: (
        type: 'keydown' | 'keyup' | 'keypress',
        listener: (event: ShortcutKeyboardEvent) => void,
        options?: AddEventListenerOptions
    ) => void;
    removeEventListener: (
        type: 'keydown' | 'keyup' | 'keypress',
        listener: (event: ShortcutKeyboardEvent) => void,
        options?: AddEventListenerOptions
    ) => void;
};
