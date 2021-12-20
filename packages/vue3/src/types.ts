import { Keyboard } from '@shortcuts/core';
import { noop } from './noop';

declare module '@vue/runtime-core' {
    export interface App {
        keyboard: Keyboard;
        keymap: typeof Keyboard.prototype.keymap;
    }
    export interface VNode<
        HostNode = RendererNode,
        HostElement = RendererElement,
        ExtraProps = {
            [key: string]: any;
        }
    > {
        detach: typeof noop;
    }
}
