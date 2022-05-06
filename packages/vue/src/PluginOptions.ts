import { MacroRegistry, KeymapOptions } from '@vgerbot/shortcuts-core';

export type PluginOptions = {
    keymap?: KeymapOptions;
    anchor?: HTMLElement | SVGAElement | Document;
    macroRegistry?: MacroRegistry;
};
