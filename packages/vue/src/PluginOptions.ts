import { MacroRegistry, KeymapOptions } from '@vgerbot/shortcuts';

export type PluginOptions = {
    keymap?: KeymapOptions;
    anchor?: HTMLElement | SVGAElement | Document;
    macroRegistry?: MacroRegistry;
};
