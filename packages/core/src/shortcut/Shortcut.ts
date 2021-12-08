import { DEFAULT_MACRO_REGISTRY, MacroRegistry } from '../macro/MacroRegistry';
import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';
import { parseShortcutKey } from './parser';
import '../locales/default';

export class Shortcut implements KeyboardEventMatcher {
    static keyDeliminator: string = '+';
    static from(
        combinationKey: string,
        registry: MacroRegistry = DEFAULT_MACRO_REGISTRY
    ): Shortcut {
        return new Shortcut(
            parseShortcutKey(combinationKey, registry, Shortcut.keyDeliminator)
        );
    }
    private constructor(private matchers: KeyboardEventMatcher[]) {}
    match(event: KeyboardEvent): boolean {
        return this.matchers.every(matcher => matcher.match(event));
    }
}
