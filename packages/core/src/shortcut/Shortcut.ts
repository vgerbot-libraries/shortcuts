import { DEFAULT_MACRO_REGISTRY, MacroRegistry } from '../macro/MacroRegistry';
import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';
import { parseShortcutKey } from './parser';
import { CtrlKeyMatcher } from '../matchers/CtrlKeyMatcher';
import { AltKeyMatcher } from '../matchers/AltKeyMatcher';
import { ShiftKeyMatcher } from '../matchers/ShiftKeyMatcher';
import { MetaKeyMatcher } from '../matchers/MetaKeyMatcher';
import { MacroKeyboardEventMatcher } from '../macro/MacroKeyboardEventMatcher';

export class Shortcut implements KeyboardEventMatcher {
    static keyDeliminator: string = '+';
    static comboDeliminator: string = ',';
    static from(
        combinationKey: string,
        registry: MacroRegistry = DEFAULT_MACRO_REGISTRY
    ): Shortcut {
        return new Shortcut(
            parseShortcutKey(
                combinationKey,
                registry,
                Shortcut.keyDeliminator,
                Shortcut.comboDeliminator
            )
        );
    }
    private matchTimes: number = 0;
    private readonly parts: ShortcutPart[];
    private constructor(matchers: KeyboardEventMatcher[][]) {
        this.parts = matchers.map(it => new ShortcutPart(it));
    }
    match(event: KeyboardEvent): boolean {
        if (this.isFullMatch()) {
            this.reset();
        }
        const shortcutPart = this.parts[this.matchTimes];
        if (!shortcutPart) {
            return false;
        }
        if (shortcutPart.match(event)) {
            this.matchTimes += 1;
            return true;
        }
        return false;
    }
    reset() {
        this.matchTimes = 0;
    }
    isPartMatch() {
        return this.matchTimes != this.parts.length;
    }
    isFullMatch() {
        return this.matchTimes === this.parts.length;
    }
    str() {
        return this.parts.map(it => it.str).join(Shortcut.comboDeliminator);
    }
    matchPartStr() {
        return this.parts
            .slice(0, this.matchTimes)
            .map(it => it.str())
            .join(Shortcut.comboDeliminator);
    }
}

class ShortcutPart {
    private ctrl: boolean = false;
    private shift: boolean = false;
    private alt: boolean = false;
    private meta: boolean = false;
    private readonly matchersWithoutModifiers: KeyboardEventMatcher[];
    constructor(private readonly allMatchers: KeyboardEventMatcher[]) {
        this.matchersWithoutModifiers = allMatchers.filter(matcher => {
            if (matcher instanceof MacroKeyboardEventMatcher) {
                matcher = matcher.origin;
            }
            if (matcher instanceof CtrlKeyMatcher) {
                this.ctrl = true;
                return false;
            } else if (matcher instanceof AltKeyMatcher) {
                this.alt = true;
                return false;
            } else if (matcher instanceof ShiftKeyMatcher) {
                this.shift = true;
                return false;
            } else if (matcher instanceof MetaKeyMatcher) {
                this.meta = true;
                return false;
            }
            return true;
        });
    }
    match(event: KeyboardEvent): boolean {
        if (this.ctrl && !event.ctrlKey) {
            return false;
        }
        if (this.shift && !event.shiftKey) {
            return false;
        }
        if (this.alt && !event.altKey) {
            return false;
        }
        if (this.meta && !event.metaKey) {
            return false;
        }
        return this.matchersWithoutModifiers.every(matcher =>
            matcher.match(event)
        );
    }
    str() {
        return this.allMatchers.map(it => it.str());
    }
}
