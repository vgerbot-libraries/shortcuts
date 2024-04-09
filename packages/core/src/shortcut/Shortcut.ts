import { DEFAULT_MACRO_REGISTRY, MacroRegistry } from '../macro/MacroRegistry';
import { KeyboardEventMatcher } from '../foundation/KeyboardEventMatcher';
import { parseShortcutKey } from './parser';
import { CtrlKeyMatcher } from '../matchers/CtrlKeyMatcher';
import { AltKeyMatcher } from '../matchers/AltKeyMatcher';
import { ShiftKeyMatcher } from '../matchers/ShiftKeyMatcher';
import { MetaKeyMatcher } from '../matchers/MetaKeyMatcher';
import { MacroKeyboardEventMatcher } from '../macro/MacroKeyboardEventMatcher';
import { ShortcutKeyboardEvent } from '../foundation/ShortcutKeyboardEvent';

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
    private readonly segments: ShortcutSegment[];

    private constructor(matchers: KeyboardEventMatcher[][]) {
        this.segments = matchers.map(it => new ShortcutSegment(it));
    }

    match(event: ShortcutKeyboardEvent | KeyboardEvent): boolean {
        if (this.isFullMatch()) {
            this.reset();
        }
        const shortcutSegment = this.segments[this.matchTimes];
        /* istanbul ignore if */
        if (!shortcutSegment) {
            return false;
        }
        if (shortcutSegment.match(event)) {
            this.matchTimes += 1;
            return true;
        }
        return false;
    }

    reset() {
        this.matchTimes = 0;
    }

    isPartialMatch() {
        return this.matchTimes != this.segments.length;
    }

    isFullMatch() {
        return this.matchTimes === this.segments.length;
    }

    str() {
        return this.segments
            .map(it => it.str())
            .join(Shortcut.comboDeliminator);
    }

    partiallyMatchesStr() {
        return this.segments
            .slice(0, this.matchTimes)
            .map(it => it.str())
            .join(Shortcut.comboDeliminator);
    }

    equals(other: Shortcut) {
        return !this.segments.some((it, i) => {
            return it.equals(other.segments[i]);
        });
    }
}

class ShortcutSegment {
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

    match(event: ShortcutKeyboardEvent | KeyboardEvent): boolean {
        if (this.ctrl !== event.ctrlKey) {
            return false;
        }
        if (this.shift !== event.shiftKey) {
            return false;
        }
        if (this.alt !== event.altKey) {
            return false;
        }
        if (this.meta !== event.metaKey) {
            return false;
        }
        return this.matchersWithoutModifiers.every(matcher =>
            matcher.match(event)
        );
    }

    str() {
        return this.allMatchers
            .map(it => it.str())
            .join(Shortcut.keyDeliminator);
    }

    equals(other: ShortcutSegment | undefined) {
        return (
            !other ||
            (this.ctrl === other.ctrl &&
                this.alt === other.alt &&
                this.shift === other.shift &&
                this.meta === other.meta &&
                !this.allMatchers.some((it, i) => {
                    return it.str() !== other.allMatchers[i]?.str();
                }))
        );
    }
}
