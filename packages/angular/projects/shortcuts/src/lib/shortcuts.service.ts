import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
    Keyboard,
    KeymapOptions,
    KeyboardEventMatcher,
    KeyboardEventMatcherFn,
    macro,
    MacroRegistry,
    DEFAULT_MACRO_REGISTRY,
    alias,
    ShortcutEventTarget
} from '@shortcuts/core';
import { SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN } from './injection.tokens';
import { ShortcutsModuleOptions } from './ShortcutsModuleOptions';

@Injectable({
    providedIn: 'root'
})
export class ShortcutsService {
    private readonly keyboard: Keyboard;
    private readonly macroRegistry: MacroRegistry;
    constructor(
        @Inject(SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN)
        private options: ShortcutsModuleOptions,
        @Inject(DOCUMENT)
        private document: Document
    ) {
        const { anchor, macroRegistry, keymap } = this.options;
        this.macroRegistry = macroRegistry || DEFAULT_MACRO_REGISTRY;
        this.keyboard = new Keyboard({
            anchor: anchor,
            registerEvents: !!anchor,
            macroRegistry: this.macroRegistry
        });
        if (keymap) {
            this.keyboard.keymap(keymap);
        }
    }
    setAnchor(anchor: ShortcutEventTarget) {
        this.keyboard.setAnchor(anchor);
    }
    getKeyboard() {
        return this.keyboard;
    }
    keymap(keymap: KeymapOptions) {
        this.keyboard.keymap(keymap);
    }
    macro(
        pattern: string,
        shortcutKey: string | KeyboardEventMatcherFn | KeyboardEventMatcher
    ) {
        macro(pattern, shortcutKey, this.macroRegistry);
    }
    alias(aliasPattern: string, originPattern: string) {
        alias(aliasPattern, originPattern);
    }
}
