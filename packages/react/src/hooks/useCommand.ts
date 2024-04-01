import { ShortcutEventHandler } from '@vgerbot/shortcuts';
import { useKeyboard } from './useKeyboard';
import { useEffect } from 'react';

export function useCommand(command: string, callback: ShortcutEventHandler) {
    const keyboard = useKeyboard();
    useEffect(() => {
        return keyboard.on(command, callback);
    }, [keyboard, callback]);
}
