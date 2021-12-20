import { Keyboard } from '@shortcuts/core';
import { ComponentOptions, VueConstructor } from 'vue';
import { PluginOptions } from './PluginOptions';
import { noop } from './noop';

export function shortcutRouterMixin(
    VueConstr: VueConstructor<Vue>,
    installOptions: PluginOptions = {}
): ComponentOptions<Vue> {
    return {
        created(this: Vue) {
            const router = this.$router;
            if (!router || router.app !== this) {
                return;
            }
            const keyboard = (this.keyboard = createKeyboardInstance(
                this,
                installOptions
            ));
            let unbind = noop;
            router.afterEach(to => {
                const contexts = keyboard.getContexts();
                loop: for (const name in contexts) {
                    const { routerNameOrPath } = contexts[name];
                    switch (routerNameOrPath) {
                        case to.name:
                        case to.path:
                        case to.fullPath:
                            unbind();
                            unbind = keyboard.switchContext(name);
                            break loop;
                    }
                }
            });
        }
    };
}

function createKeyboardInstance(vue: Vue, installOptions: PluginOptions) {
    const { anchor, keymap: setupKeymap } = installOptions;
    const targetAnchor = anchor || vue.$el;
    if (
        (targetAnchor instanceof HTMLElement ||
            targetAnchor instanceof SVGElement) &&
        targetAnchor != document.body
    ) {
        const tabindex = targetAnchor.tabIndex;
        if (isNaN(tabindex)) {
            targetAnchor.tabIndex = -1;
        }
    }
    const keyboard = new Keyboard({
        anchor: targetAnchor
    });
    keyboard.keymap(setupKeymap || {});
    return keyboard;
}
