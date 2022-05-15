import { Inject, Injectable, Optional } from '@angular/core';
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
    ShortcutEventHandler,
    AddShortcutEventOptions
} from '@vgerbot/shortcuts';
import { Router, NavigationStart } from '@angular/router';
import { SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN } from './injection.tokens';
import { ShortcutsModuleOptions } from './ShortcutsModuleOptions';
import '../ext-shortcuts';

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
        private document: Document,
        @Optional()
        private router?: Router
    ) {
        const { anchor, macroRegistry, keymap } = this.options;
        this.macroRegistry = macroRegistry || DEFAULT_MACRO_REGISTRY;
        this.keyboard = new Keyboard({
            anchor: anchor,
            macroRegistry: this.macroRegistry
        });
        if (keymap) {
            this.keyboard.keymap(keymap);
        }
        router?.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                const contexts = this.keyboard.getContexts();
                for (const name in contexts) {
                    const { matchRouter } = contexts[name];
                    if (matchRouter && matchRouter(event)) {
                        this.keyboard.switchContext(name);
                    }
                }
            }
        });
    }
    getKeyboard() {
        return this.keyboard;
    }
    keymap(keymap: KeymapOptions) {
        this.keyboard.keymap(keymap);
    }
    on(
        command: string,
        handler: ShortcutEventHandler<void>,
        options?: Partial<AddShortcutEventOptions>
    ) {
        return this.keyboard.on(command, handler, options);
    }
    macro(
        pattern: string,
        shortcutKey: string | KeyboardEventMatcherFn | KeyboardEventMatcher,
        str?: string
    ) {
        macro(pattern, shortcutKey, this.macroRegistry, str);
    }
    alias(aliasPattern: string, originPattern: string, str?: string) {
        alias(aliasPattern, originPattern, this.macroRegistry, str);
    }
}
