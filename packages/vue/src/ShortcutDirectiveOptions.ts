import { MacroRegistry } from '@vgerbot/shortcuts-core';

export interface ShortcutDirectiveOptions {
    directiveName: string;
    macroRegistry?: MacroRegistry;
}
