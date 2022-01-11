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
                match: shortcutKey,
                str() {
                    return pattern;
                }
            };
            break;
        default:
            macroMatcher = wrap(pattern, shortcutKey);
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

export function keyCodeMacro(pattern: string, keyCode: number) {
    return macro(pattern, new KeyCodeMatcher(keyCode));
}

function wrap(macroPattern: string, shortcutMatcher: KeyboardEventMatcher) {
    if (shortcutMatcher.str() === macroPattern) {
        return shortcutMatcher;
    }
    if (shortcutMatcher instanceof MacroWrappedMatcher) {
        return new MacroWrappedMatcher(macroPattern, shortcutMatcher.origin);
    }
    return new MacroWrappedMatcher(macroPattern, shortcutMatcher);
}

class MacroWrappedMatcher implements KeyboardEventMatcher {
    constructor(
        private readonly macroPattern: string,
        readonly origin: KeyboardEventMatcher
    ) {}

    match(event: KeyboardEvent): boolean {
        return this.origin.match(event);
    }

    str(): string {
        return this.macroPattern;
    }
}
