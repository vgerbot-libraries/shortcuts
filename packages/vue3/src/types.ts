import { Keyboard } from '@vgerbot/shortcuts';
import { noop } from './noop';
import { RouteRecordName } from 'vue-router';

declare module '@vue/runtime-core' {
    export interface App {
        keyboard: Keyboard;
        keymap: typeof Keyboard.prototype.keymap;
    }
    export interface VNode {
        detach: typeof noop;
    }
}
declare module '@vgerbot/shortcuts' {
    export interface FullContextOptions {
        router: RouteRecordName | undefined | null;
    }
}
