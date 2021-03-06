import {
    KeyboardEventMatcher,
    KeyboardEventMatcherFn
} from '../foundation/KeyboardEventMatcher';
import { KeyCodeMatcher } from '../matchers/KeyCodeMatcher';
import {
    CaseInsensitiveKeyMatcher,
    CaseSensitiveKeyMatcher
} from '../matchers/KeyMatcher';
import { Shortcut } from '../shortcut/Shortcut';
import { DEFAULT_MACRO_REGISTRY, MacroRegistry } from './MacroRegistry';
import { MacroKeyboardEventMatcher } from './MacroKeyboardEventMatcher';

export function macro(
    pattern: string,
    shortcutKey: string | KeyboardEventMatcherFn | KeyboardEventMatcher,
    registry: MacroRegistry = DEFAULT_MACRO_REGISTRY,
    label: string = pattern
) {
    let macroMatcher: KeyboardEventMatcher;
    switch (typeof shortcutKey) {
        case 'string':
            macroMatcher = Shortcut.from(shortcutKey, registry);
            break;
        case 'function':
            macroMatcher = {
                match: shortcutKey,
                str() {
                    return label;
                }
            };
            break;
        default:
            macroMatcher = wrap(label, shortcutKey);
    }
    registry.register(pattern, macroMatcher);
}

export function alias(
    aliasPattern: string,
    originPattern: string,
    registry: MacroRegistry = DEFAULT_MACRO_REGISTRY,
    label: string = aliasPattern
) {
    const matcher = registry.get(originPattern);
    if (!matcher) {
        throw new Error('Cannot set the alias that the pattern is not exists!');
    }
    macro(aliasPattern, matcher, registry, label);
}

export function keyMacro(
    pattern: string,
    key: string = pattern,
    registry: MacroRegistry = DEFAULT_MACRO_REGISTRY,
    userFriendlyStr: string = pattern
) {
    return macro(
        pattern,
        new CaseSensitiveKeyMatcher(key),
        registry,
        userFriendlyStr
    );
}

export function keyMacro_ins(
    pattern: string,
    key: string = pattern,
    registry: MacroRegistry = DEFAULT_MACRO_REGISTRY,
    label: string = pattern
) {
    return macro(pattern, new CaseInsensitiveKeyMatcher(key), registry, label);
}

export function keyCodeMacro(
    pattern: string,
    keyCode: number,
    registry: MacroRegistry = DEFAULT_MACRO_REGISTRY,
    label: string = pattern
) {
    return macro(pattern, new KeyCodeMatcher(keyCode), registry, label);
}

function wrap(label: string, shortcutMatcher: KeyboardEventMatcher) {
    if (shortcutMatcher.str() === label) {
        return shortcutMatcher;
    }
    if (shortcutMatcher instanceof MacroKeyboardEventMatcher) {
        return new MacroKeyboardEventMatcher(label, shortcutMatcher.origin);
    }
    return new MacroKeyboardEventMatcher(label, shortcutMatcher);
}
