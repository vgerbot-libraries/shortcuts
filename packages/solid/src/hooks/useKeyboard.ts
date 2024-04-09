import { createEffect, useContext } from 'solid-js';
import { KeyboardContext } from '../context/KeyboardContext';
import { Keyboard } from '@vgerbot/shortcuts';

export function useKeyboard(
    callback?: (keyboard: Keyboard) => void | (() => void)
) {
    const getKeyboard = useContext(KeyboardContext);
    if (callback) {
        createEffect(() => {
            const keyboard = getKeyboard();
            return callback(keyboard);
        });
    }
    return getKeyboard;
}
