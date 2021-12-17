import { MacroRegistry, KeymapOptions } from '@shortcuts/core';

export type ShortcutsVuePluginOptions = {
    keymap?: KeymapOptions;
    anchor?: HTMLElement | SVGAElement | Document;
    macroRegistry?: MacroRegistry;
};
