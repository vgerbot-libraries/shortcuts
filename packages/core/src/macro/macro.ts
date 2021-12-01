import {
    KeyboardEventMatcher,
    KeyboardEventMatcherFn
} from '../foundation/KeyboardEventMatcher';
import {
    CaseInsensitiveKeyMatcher,
    CaseSensitiveKeyMatcher
} from '../matchers/KeyMatcher';
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

export function alias(
    aliasPattern: string,
    originPattern: string,
    registry: MacroRegistry = DEFAULT_MACRO_REGISTRY
) {
    const matcher = registry.get(originPattern);
    if (!matcher) {
        throw new Error('Cannot set the alias that the pattern is not exists!');
    }
    macro(aliasPattern, matcher, registry);
}

export function keyMacro(pattern: string, key: string = pattern) {
    macro(pattern, new CaseSensitiveKeyMatcher(key));
}
export function keyMacro_ins(pattern: string, key: string = pattern) {
    macro(pattern, new CaseInsensitiveKeyMatcher(key));
}
