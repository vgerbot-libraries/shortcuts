import { MacroRegistry, KeymapOptions } from '@shortcuts/core';

export class PluginOptions {
    keymap?: KeymapOptions;
    anchor?: HTMLElement | SVGAElement | Document;
    eventOptions?: AddEventListenerOptions;
    macroRegistry?: MacroRegistry;
}
