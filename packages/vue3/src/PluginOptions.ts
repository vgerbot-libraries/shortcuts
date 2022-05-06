import { MacroRegistry, KeymapOptions } from '@vgerbot/shortcuts-core';

export class PluginOptions {
    keymap?: KeymapOptions;
    anchor?: HTMLElement | SVGAElement | Document;
    eventOptions?: AddEventListenerOptions;
    macroRegistry?: MacroRegistry;
}
