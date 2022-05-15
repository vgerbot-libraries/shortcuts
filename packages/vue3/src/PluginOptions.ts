import { MacroRegistry, KeymapOptions } from '@vgerbot/shortcuts';

export class PluginOptions {
    keymap?: KeymapOptions;
    anchor?: HTMLElement | SVGAElement | Document;
    eventOptions?: AddEventListenerOptions;
    macroRegistry?: MacroRegistry;
}
