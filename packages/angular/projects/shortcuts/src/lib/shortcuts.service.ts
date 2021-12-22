import { Inject, Injectable } from '@angular/core';
import { Keyboard } from '@shortcuts/core';
import { SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN } from './injection.tokens';
import { ShortcutsModuleOptions } from './ShortcutsModuleOptions';

@Injectable({
    providedIn: 'root'
})
export class ShortcutsService {
    private readonly keyboard: Keyboard;
    constructor(
        @Inject(SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN)
        private options: ShortcutsModuleOptions
    ) {
        const { anchor, macroRegistry, keymap } = this.options;
        this.keyboard = new Keyboard({
            anchor: anchor,
            macroRegistry: macroRegistry
        });
        if (keymap) {
            this.keyboard.keymap(keymap);
        }
    }
    getKeyboard() {
        return this.keyboard;
    }
}
