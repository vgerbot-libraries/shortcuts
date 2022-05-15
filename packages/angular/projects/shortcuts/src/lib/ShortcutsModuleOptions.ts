import { KeymapOptions, MacroRegistry } from '@vgerbot/shortcuts';

export interface ShortcutsModuleOptions {
    keymap?: KeymapOptions;
    macroRegistry?: MacroRegistry;
    anchor?: HTMLElement | Document | Window;
}
