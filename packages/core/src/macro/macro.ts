import {
    KeyboardEventMatcher,
    KeyboardEventMatcherFn
} from '../foundation/KeyboardEventMatcher';
import { Shortcut } from '../shortcut/Shortcut';
import { DEFAULT_MACRO_REGISTRY, MacroRegistry } from './MacroRegistry';

export function macro(
    pattern: string,
    shortcutKey: string | KeyboardEventMatcherFn | KeyboardEventMatcher,
    registry: MacroRegistry = DEFAULT_MACRO_REGISTRY
) {
    let macroMatcher: KeyboardEventMatcher;
    switch (typeof shortcutKey) {
        case 'string':
            macroMatcher = Shortcut.from(shortcutKey, registry);
            break;
        case 'function':
            macroMatcher = {
                match: shortcutKey
            };
            break;
        default:
            macroMatcher = shortcutKey;
    }
    registry.register(pattern, macroMatcher);
}
