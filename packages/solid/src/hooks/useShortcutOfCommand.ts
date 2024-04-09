import { useKeyboard } from './useKeyboard';

export function useShortcutOfCommand(command: string): () => string {
    const getKeyboard = useKeyboard();
    return () => {
        const keyboard = getKeyboard();
        return keyboard.getCommandOptions(command)?.shortcut.str() || '';
    };
}
