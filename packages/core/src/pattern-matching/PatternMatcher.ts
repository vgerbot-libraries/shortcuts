import { ShortcutEventHandler } from '../foundation/ShortcutEventHandler';

export interface PatternMatcher {
    (shortcutsOrCommand: string, handler: ShortcutEventHandler): PatternMatcher;
    <T>(e: KeyboardEvent): T;
    case: PatternMatcher;
}
