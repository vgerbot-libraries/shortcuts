import { ShortcutEvent, ShortcutEventImpl } from '../foundation/ShortcutEvent';
import { ShortcutEventHandler } from '../foundation/ShortcutEventHandler';
import { Shortcut } from '../shortcut/Shortcut';
import { PatternMatcher } from './PatternMatcher';

interface PatternMatchCase<T> {
    shortcuts: Shortcut[];
    handlerOrValue: ShortcutEventHandler<T> | T;
}

function _match_<T>(
    shortcutsStr: string,
    handler: ShortcutEventHandler<T> | T
) {
    return _case(shortcutsStr, handler, []);
}

_match_.case = _match_;
_match_['else'] = _else([]);

export const match: typeof _match_ | PatternMatcher<unknown> = _match_;

function createMatcher<T = unknown>(
    cases?: PatternMatchCase<T>[]
): PatternMatcher<T> {
    const match = <PatternMatcher<T>>(
        (<unknown>(
            function <P = T>(
                ...args: [string, ShortcutEventHandler<P> | P] | [KeyboardEvent]
            ) {
                type Cases = Array<PatternMatchCase<P>>;
                if (args.length === 2) {
                    return _case(
                        args[0],
                        args[1],
                        (cases || []) as unknown as Cases
                    );
                } else {
                    const event = args[0];
                    return executeCaseMatcher<P>(
                        event,
                        (cases || []) as unknown as Cases
                    );
                }
            }
        ))
    );
    match.case = match.bind(null);
    match.else = _else(cases);
    return match;
}

function _else(cases?: PatternMatchCase<unknown>[]) {
    return <T>(handler: (e: KeyboardEvent) => T | T) => {
        return (e: KeyboardEvent): T | undefined => {
            return executeCaseMatcher<T>(
                e,
                (cases || []) as PatternMatchCase<T>[],
                handler
            );
        };
    };
}

function _case<T>(
    shortcutsStr: string,
    handlerOrValue: ShortcutEventHandler<T> | T,
    cases: PatternMatchCase<T>[]
) {
    const shortcuts = shortcutsStr.split(/|+/).map(it => {
        return Shortcut.from(it);
    });
    return createMatcher(
        cases.concat({
            shortcuts,
            handlerOrValue
        })
    );
}
function executeCaseMatcher<T>(
    event: KeyboardEvent,
    cases: PatternMatchCase<T>[],
    _else_?: (e: KeyboardEvent) => T | T
): T | undefined {
    let result: T | undefined;
    const hasMatch = cases.some(it => {
        return it.shortcuts.some(shortcut => {
            if (shortcut.match(event)) {
                const handlerOrValue = it.handlerOrValue;
                if (typeof handlerOrValue === 'function') {
                    const handler = handlerOrValue as ShortcutEventHandler<T>;
                    result = handler.call(
                        null,
                        new ShortcutEventImpl(shortcut, event)
                    );
                } else {
                    result = handlerOrValue;
                }
                return true;
            }
            return false;
        });
    });
    if (!hasMatch) {
        if (typeof _else_ === 'function') {
            return _else_(event);
        } else {
            return _else_;
        }
    }
    return result;
}
