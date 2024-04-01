import { Keyboard } from '@vgerbot/shortcuts';
import { KeyboardConstructorOptions } from '@vgerbot/shortcuts/lib/foundation/KeyboardConstructorOptions';
import React, { useEffect, useRef } from 'react';
import { KeyboardContext } from './KeyboardContext';
const KEYBOARD_PROPS = Symbol('keyboard-props');

type KeyboardProviderProps =
    React.PropsWithChildren<KeyboardConstructorOptions>;

interface ReactKeyboard extends Keyboard {
    [KEYBOARD_PROPS]: KeyboardProviderProps;
}

export function KeyboardProvider(props: KeyboardProviderProps) {
    const keyboardRef = useRef<ReactKeyboard>();
    if (!keyboardRef.current) {
        keyboardRef.current = new Keyboard(props) as ReactKeyboard;
        keyboardRef.current[KEYBOARD_PROPS] = props;
    }
    useEffect(() => {
        const anchor = keyboardRef.current?.getAnchor();
        if (!props.anchor || anchor === props.anchor) {
            return;
        }
        keyboardRef.current?.setAnchor(props.anchor);
    }, [props.anchor]);
    useEffect(() => {
        if (
            keyboardRef.current &&
            keyboardRef.current[KEYBOARD_PROPS] === props
        ) {
            return;
        }
        keyboardRef.current?.destroy();
        const keyboard = (keyboardRef.current = new Keyboard(
            props
        ) as ReactKeyboard);
        keyboard[KEYBOARD_PROPS] = props;
    }, [props.eventOptions, props.macroRegistry]);
    return (
        <KeyboardContext.Provider value={keyboardRef.current}>
            {props.children}
        </KeyboardContext.Provider>
    );
}
