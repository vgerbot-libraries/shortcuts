import { ShortcutEventHandler } from '../foundation/ShortcutEventHandler';

export interface PatternMatcher<T = unknown> {
    (
        shortcutsOrCommand: string,
        handler: ShortcutEventHandler<T> | T
    ): PatternMatcher<T>;
    (e: KeyboardEvent): T;
    case: PatternMatcher<T>;
}
