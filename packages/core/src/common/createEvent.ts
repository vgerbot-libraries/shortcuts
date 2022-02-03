export type NativeEventType =
    | 'blur'
    | 'focus'
    | 'change'
    | 'click'
    | 'dblclick'
    | 'input'
    | 'keydown'
    | 'keyup'
    | 'mousedown'
    | 'mouseup'
    | 'pointerdown'
    | 'pointerup'
    | string;
export function createEvent(type: NativeEventType) {
    switch (type) {
        case 'click':
        case 'dblclick':
        case 'mousedown':
        case 'mouseup':
            return new MouseEvent(type);
        case 'pointerdown':
        case 'pointerup':
            return new PointerEvent(type);
        case 'blur':
        case 'focus':
            return new FocusEvent(type);
        case 'input':
            return new InputEvent(type);
        default:
            return new Event(type);
    }
}
