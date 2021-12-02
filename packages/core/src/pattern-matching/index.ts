import { ShortcutEventImpl } from '../foundation/ShortcutEvent';
import { ShortcutEventHandler } from '../foundation/ShortcutEventHandler';
import { Shortcut } from '../shortcut/Shortcut';
import { PatternMatcher } from './PatternMatcher';

interface PatternMatchCase {
    shortcuts: Shortcut[];
    handler: ShortcutEventHandler;
}

export const match = createMatcher();

function createMatcher(cases?: PatternMatchCase[]): PatternMatcher {
    const match = <PatternMatcher>(
        (<unknown>(
            function (
                ...args: [string, ShortcutEventHandler] | [KeyboardEvent]
            ) {
                if (args.length === 2) {
                    return _case(args[0], args[1], cases || []);
                } else {
                    const event = args[0];
                    return executeCaseMatcher(event, cases || []);
                }
            }
        ))
    );
    match.case = match;
    return match;
}

function _case(
    shortcutsStr: string,
    handler: ShortcutEventHandler,
    cases: PatternMatchCase[]
) {
    const shortcuts = shortcutsStr.split(/|+/).map(it => {
        return Shortcut.from(it);
    });
    return createMatcher(
        cases.concat({
            shortcuts,
            handler
        })
    );
}
function executeCaseMatcher(event: KeyboardEvent, cases: PatternMatchCase[]) {
    let result;
    cases.some(it => {
        return it.shortcuts.some(shortcut => {
            if (shortcut.match(event)) {
                result = it.handler.call(
                    null,
                    new ShortcutEventImpl(shortcut, event)
                );
                return true;
            }
            return false;
        });
    });
    return result;
}
