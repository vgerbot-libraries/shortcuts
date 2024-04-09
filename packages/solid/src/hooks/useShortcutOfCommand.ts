import { useKeyboard } from './useKeyboard';
import { createSignal, createEffect } from 'solid-js';

export function useShortcutOfCommand(command: string): () => string {
    const getKeyboard = useKeyboard();
    const [shortcut, setShortcut] = createSignal('');
    createEffect(() => {
        const keyboard = getKeyboard();
        const shortcut =
            keyboard.getCommandOptions(command)?.shortcut.str() || '';
        setShortcut(shortcut);
        return keyboard.onCommandChange(command, option => {
            setShortcut(option.shortcut.str());
        });
    });

    return shortcut;
}
