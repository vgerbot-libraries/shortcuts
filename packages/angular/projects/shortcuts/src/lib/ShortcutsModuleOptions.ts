import { KeymapOptions, MacroRegistry } from '@vgerbot/shortcuts-core';

export interface ShortcutsModuleOptions {
    keymap?: KeymapOptions;
    macroRegistry?: MacroRegistry;
    anchor?: HTMLElement | Document | Window;
}
