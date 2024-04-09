import { Shortcut, ShortcutEventHandler } from '@vgerbot/shortcuts';
import { useKeyboard } from './useKeyboard';

export function useShortcutKeyMatch(
    shortcut: string | Shortcut,
    callback: ShortcutEventHandler
) {
    useKeyboard(keyboard => {
        return keyboard.onShortcutKeyMatch(shortcut, callback);
    });
}
