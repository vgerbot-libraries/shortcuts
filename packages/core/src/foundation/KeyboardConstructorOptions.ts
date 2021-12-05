import { MacroRegistry } from '../macro/MacroRegistry';

export interface KeyboardConstructorOptions {
    anchor?: GlobalEventHandlers;
    eventOptions?: AddEventListenerOptions;
    macroRegistry?: MacroRegistry;
}
