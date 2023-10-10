export interface ShortcutKeyboardEvent {
    type: 'keydown' | 'keyup' | 'keypress';
    shiftKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    altKey: boolean;
    keyCode: number;
    key: string;
    preventDefault: () => void;
    stopPropagation: () => void;
    stopImmediatePropagation: () => void;
}
