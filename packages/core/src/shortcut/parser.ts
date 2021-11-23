import { MacroRegistry } from '../macro/MacroRegistry';
import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';

export function parseShortcutKey(
    shortcutKey: string,
    registry: MacroRegistry,
    comboDeliminator: string = '+'
): KeyboardEventMatcher[] {
    return split(shortcutKey, comboDeliminator)
        .map(it => {
            const matcher = registry.get(it);
            if (!matcher) {
                throw new Error(`Macro not found: ${it}`);
            }
            return matcher;
        })
        .filter(Boolean) as KeyboardEventMatcher[];
}

function split(shortcutKey: string, deliminator: string) {
    if (deliminator.length !== 1) {
        throw new Error('The deliminator should be single character.');
    }
    const chars = shortcutKey.split('');
    return chars.slice(1).reduce((arr, chr) => {
        const prevStr = arr[arr.length - 1];
        const prevChr = prevStr[prevStr.length - 1];
        if (chr === deliminator && prevChr !== '\\') {
            return arr.concat('');
        }
        return arr.slice(0, -1).concat(prevStr + chr);
    }, chars.slice(0, 1));
}
