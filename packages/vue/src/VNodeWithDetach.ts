import { VNode } from 'vue';

export interface VNodeWithDetach extends VNode {
    detach(): void;
}
