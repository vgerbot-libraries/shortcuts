import { KeymapOptions, MacroRegistry } from '@shortcuts/core';

export interface ShortcutsModuleOptions {
    keymap?: KeymapOptions;
    macroRegistry?: MacroRegistry;
    anchor?: HTMLElement | Document | Window;
}
