import { Keyboard } from '../../../src';
import { keydownEvent } from '../../mocks/mockKeyboardEvent';

describe('foundation/Keyboard', () => {
    it('create Keyboard instance and not throw error', () => {
        expect(() => {
            new Keyboard();
        }).not.toThrowError();
    });
    it('setAnchor & getAnchor', () => {
        const anchor = document.createElement('div');

        const addEventListenerSpy = jest.spyOn(anchor, 'addEventListener');

        const keyboard = new Keyboard();

        keyboard.setAnchor(anchor);

        expect(keyboard.getAnchor()).toBe(anchor);

        expect(addEventListenerSpy).toBeCalledTimes(2);
    });
    it('keymap', () => {
        const keyboard = new Keyboard();
        keyboard.keymap({
            commands: {
                combine: 'Ctrl+M',
                delete: 'Delete',
                undo: {
                    event: ['keyup'],
                    shortcut: 'Ctrl+Z'
                }
            },
            contexts: {
                edit: {
                    commands: ['delete', 'undo']
                }
            }
        });
    });
    it('register and remove events', () => {
        const keyboard = new Keyboard();
        keyboard.keymap({
            commands: {
                copy: 'Ctrl+C'
            },
            contexts: {
                default_context: {
                    commands: ['copy']
                }
            }
        });
        const copyListener = jest.fn();

        const removeEvent = keyboard.on('copy', copyListener);

        keyboard.switchContext('default_context');

        const event = keydownEvent({
            ctrlKey: true,
            key: 'C'
        });

        keyboard.fire(event);

        expect(copyListener).toBeCalledTimes(1);

        removeEvent();

        keyboard.fire(event);

        expect(copyListener).toBeCalledTimes(1);
    });
    it('register and fire events', () => {
        const keyboard = new Keyboard();
        keyboard.keymap({
            commands: {
                copy: 'Ctrl+C'
            },
            contexts: {
                default_context: {
                    commands: ['copy']
                }
            }
        });

        const copyListener = jest.fn();

        keyboard.on('copy', copyListener);

        const event = keydownEvent({
            ctrlKey: true,
            key: 'C'
        });

        keyboard.fire(event);

        expect(copyListener).not.toBeCalled();

        keyboard.switchContext('default_context');

        keyboard.fire(event);

        expect(copyListener).toBeCalled();
    });
});
