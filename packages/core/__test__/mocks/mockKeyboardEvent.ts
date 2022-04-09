export function mockKeyboardEvent(
    type: 'keydown' | 'keyup',
    options?: KeyboardEventInit
) {
    const event = new KeyboardEvent(type, options);
    jest.spyOn(event, 'getModifierState').mockImplementation(modifier => {
        switch (modifier) {
            case 'Alt':
                return options?.altKey || false;
            case 'Control':
                return options?.ctrlKey || false;
            case 'Shift':
                return options?.shiftKey || false;
        }
        return false;
    });
    return event;
}

export function keydownEvent(options?: KeyboardEventInit) {
    return mockKeyboardEvent('keydown', options);
}

export function keyupEvent(options?: KeyboardEventInit) {
    return mockKeyboardEvent('keyup', options);
}
