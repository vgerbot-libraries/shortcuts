import { Keyboard, KeymapOptions } from '@shortcuts/core';
import Vue, { PluginObject, VueConstructor, PluginFunction } from 'vue';
import './types';

import { createShortcutDirectiveDefinition } from './shortcut.directive';
import { createShortkeyDirectiveDefinition } from './shortkey.directive';
import { shortcutRouterMixin } from './shortcutRouterMixin';
import { ShortcutsVuePluginOptions } from './ShortcutsVuePluginOptions';

export type ShortcutsPluginObject = PluginObject<ShortcutsVuePluginOptions>;

const SHORTCUT_DIRECTIVE_NAME = 'shortcut';
const SHORTKEY_DIRECTIVE_NAME = 'shortkey';

export const Shortcuts: ShortcutsPluginObject = {
    install: <PluginFunction<ShortcutsVuePluginOptions>>((
        VueConstr: VueConstructor<Vue>,
        installOptions: ShortcutsVuePluginOptions = {}
    ) => {
        VueConstr.mixin(shortcutRouterMixin(VueConstr, installOptions));

        VueConstr.prototype.keymap = function (
            extKeymapOptions: KeymapOptions
        ) {
            const keyboard = this.keyboard as Keyboard;
            keyboard.keymap(extKeymapOptions);
        };
        VueConstr.directive(
            SHORTCUT_DIRECTIVE_NAME,
            createShortcutDirectiveDefinition({
                directiveName: SHORTCUT_DIRECTIVE_NAME,
                macroRegistry: installOptions.macroRegistry
            })
        );
        VueConstr.directive(
            SHORTKEY_DIRECTIVE_NAME,
            createShortkeyDirectiveDefinition({
                directiveName: SHORTKEY_DIRECTIVE_NAME,
                macroRegistry: installOptions.macroRegistry
            })
        );
    })
};
