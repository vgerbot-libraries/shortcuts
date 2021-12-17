import { MacroRegistry } from '../macro/MacroRegistry';

export interface KeyboardConstructorOptions {
    anchor?: EventTarget;
    eventOptions?: AddEventListenerOptions;
    macroRegistry?: MacroRegistry;
}
