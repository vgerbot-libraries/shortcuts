import { MacroRegistry } from '@vgerbot/shortcuts';

export interface ShortcutDirectiveOptions {
    directiveName: string;
    macroRegistry?: MacroRegistry;
}
