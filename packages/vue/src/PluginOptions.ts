import { MacroRegistry, KeymapOptions } from '@shortcuts/core';

export type PluginOptions = {
    keymap?: KeymapOptions;
    anchor?: HTMLElement | SVGAElement | Document;
    macroRegistry?: MacroRegistry;
};
