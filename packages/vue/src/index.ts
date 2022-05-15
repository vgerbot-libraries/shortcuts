import { Keyboard, KeymapOptions, macro } from '@vgerbot/shortcuts';
import Vue, { PluginObject, VueConstructor, PluginFunction } from 'vue';
import './types';

import { createShortcutDirectiveDefinition } from './shortcut.directive';
import { createShortkeyDirectiveDefinition } from './shortkey.directive';
import { shortcutRouterMixin } from './shortcutRouterMixin';
import { PluginOptions } from './PluginOptions';

export type ShortcutsPluginObject = PluginObject<PluginOptions>;

const SHORTCUT_DIRECTIVE_NAME = 'shortcut';
const SHORTKEY_DIRECTIVE_NAME = 'shortkey';

export const Shortcuts: ShortcutsPluginObject = {
    install: <PluginFunction<PluginOptions>>((
        VueConstr: VueConstructor<Vue>,
        pluginOptions: PluginOptions = {}
    ) => {
        VueConstr.mixin(shortcutRouterMixin(VueConstr, pluginOptions));

        VueConstr.prototype.keymap = function (
            extKeymapOptions: KeymapOptions
        ) {
            const keyboard = this.keyboard as Keyboard;
            keyboard.keymap(extKeymapOptions);
        };
        VueConstr.prototype.macro = <typeof macro>(
            function (pattern, shortcutKey, registry) {
                return macro(
                    pattern,
                    shortcutKey,
                    registry || pluginOptions.macroRegistry
                );
            }
        );
        VueConstr.directive(
            SHORTCUT_DIRECTIVE_NAME,
            createShortcutDirectiveDefinition({
                directiveName: SHORTCUT_DIRECTIVE_NAME,
                macroRegistry: pluginOptions.macroRegistry
            })
        );
        VueConstr.directive(
            SHORTKEY_DIRECTIVE_NAME,
            createShortkeyDirectiveDefinition({
                directiveName: SHORTKEY_DIRECTIVE_NAME,
                macroRegistry: pluginOptions.macroRegistry
            })
        );
    })
};
