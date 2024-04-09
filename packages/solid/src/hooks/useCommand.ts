import { ShortcutEventHandler } from '@vgerbot/shortcuts';
import { useKeyboard } from './useKeyboard';

export function useCommand(command: string, callback: ShortcutEventHandler) {
    useKeyboard(keyboard => {
        return keyboard.on(command, callback);
    });
}
