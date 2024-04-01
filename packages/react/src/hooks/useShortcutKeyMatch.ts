import { useEffect } from 'react';
import { useKeyboard } from './useKeyboard';
import { Shortcut, ShortcutEventHandler } from '@vgerbot/shortcuts';

export function useShortcutKeyMatch(
    shortcut: string | Shortcut,
    callback: ShortcutEventHandler
) {
    const keyboard = useKeyboard();
    useEffect(() => {
        return keyboard.onShortcutKeyMatch(shortcut, callback);
    }, [keyboard]);
}
