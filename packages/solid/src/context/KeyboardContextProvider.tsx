import {
    JSXElement,
    ParentProps,
    createEffect,
    createSignal,
    on,
    untrack
} from 'solid-js';
import { KeyboardContext } from './KeyboardContext';
import { Keyboard } from '@vgerbot/shortcuts';

type Options = ConstructorParameters<typeof Keyboard>[0];

type InitKeyboardProviderProps = ParentProps<Options>;

type UserProvideKeyboardProps = ParentProps<{ keyboard: Keyboard }>;

export function KeyboardProvider(props: ParentProps<Options>): JSXElement;
export function KeyboardProvider(
    props: ParentProps<{ keyboard: Keyboard }>
): JSXElement;
export function KeyboardProvider(
    props: InitKeyboardProviderProps | UserProvideKeyboardProps
) {
    if ('keyboard' in props) {
        return (
            <KeyboardContext.Provider value={() => props.keyboard}>
                {props.children}
            </KeyboardContext.Provider>
        );
    } else {
        const [keyboard, setKeyboard] = createSignal(new Keyboard(props));
        createEffect(() => {
            const [eventOptions, macroRegistry] = untrack(() => [
                props.eventOptions,
                props.macroRegistry
            ]);
            const oldKeyboard = keyboard();
            if (oldKeyboard) {
                oldKeyboard.destroy();
            }
            setKeyboard(
                new Keyboard({
                    anchor: props.anchor,
                    eventOptions,
                    macroRegistry
                })
            );
        });
        createEffect(
            on(
                [() => props.eventOptions, () => props.macroRegistry],
                ([eventOptions, macroRegistry]) => {
                    const oldKeyboard = keyboard();
                    if (oldKeyboard) {
                        oldKeyboard.destroy();
                    }
                    setKeyboard(
                        new Keyboard({
                            anchor: props.anchor,
                            eventOptions,
                            macroRegistry
                        })
                    );
                }
            )
        );
        return (
            <KeyboardContext.Provider value={keyboard}>
                {props.children}
            </KeyboardContext.Provider>
        );
    }
}
