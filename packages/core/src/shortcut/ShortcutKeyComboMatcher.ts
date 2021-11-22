import { MacroRegistry } from '../macro/MacroRegistry';
import { KeyboardEventMatcher } from '../matcher/KeyboardEventMatcher';

export class ShortcutKeyComboMatcher implements KeyboardEventMatcher {
    private readonly matchers: KeyboardEventMatcher[];
    constructor(keyCombo: string[], registry: MacroRegistry) {
        this.matchers = keyCombo.map(it => {
            const matcher = registry.get(it);
            if (!matcher) {
                throw new Error(`No matcher found for this macro: ${it}`);
            }
            return matcher;
        });
    }
    match(event: KeyboardEvent): boolean {
        return this.matchers.every(it => it.match(event));
    }
}
