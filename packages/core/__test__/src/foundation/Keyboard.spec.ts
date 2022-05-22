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
                },
                read: {
                    commands: []
                }
            }
        });
        expect(Object.keys(keyboard.getCommands())).toStrictEqual([
            'combine',
            'delete',
            'undo'
        ]);
        expect(keyboard.getCommandsOfContext('edit')).toStrictEqual([
            'delete',
            'undo'
        ]);
        expect(
            keyboard.getCommandsOfContext('nonexistent-context')
        ).toStrictEqual([]);

        expect(Object.keys(keyboard.getContexts())).toStrictEqual([
            'edit',
            'read'
        ]);
        expect(keyboard.getCommandOptions('combine')).toBeDefined();
        expect(keyboard.getCommandOptions('delete')).toBeDefined();
        expect(keyboard.getCommandOptions('undo')).toBeDefined();
    });
    it('overrite keymap', () => {
        const keyboard = new Keyboard();
        const interceptorsOfRedoCommand = [
            () => {
                //
            }
        ];
        keyboard.keymap({
            commands: {
                combine: 'Ctrl+M',
                redo: {
                    event: ['keydown'],
                    interceptors: interceptorsOfRedoCommand,
                    preventDefault: false,
                    shortcut: 'Ctrl+Y'
                },
                undo: {
                    event: ['keyup'],
                    preventDefault: true,
                    shortcut: 'Ctrl+Z'
                }
            }
        });
        expect(keyboard.getCommandOptions('redo')?.preventDefault).toBeFalsy();

        keyboard.keymap({
            commands: {
                redo: {
                    interceptors: [],
                    preventDefault: true,
                    shortcut: 'Ctrl+Shift+Z'
                }
            }
        });
        const commandOptionsOfRedo = keyboard.getCommandOptions('redo');
        expect(commandOptionsOfRedo?.shortcut?.str()).toBe('Ctrl+Shift+Z');

        expect(commandOptionsOfRedo?.preventDefault).toBeTruthy();
        expect(commandOptionsOfRedo?.interceptors).toEqual([]);

        keyboard.keymap({
            commands: {
                undo: {
                    interceptors: interceptorsOfRedoCommand,
                    shortcut: 'Ctrl+Z'
                }
            }
        });
        expect(keyboard.getCommandOptions('undo')?.interceptors).toBe(
            interceptorsOfRedoCommand
        );
    });
    it('switchContext', () => {
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
                },
                invisible: {
                    commands: []
                },
                read: {
                    commands: []
                }
            }
        });
        keyboard.switchContext('edit');
        expect(keyboard.getCurrentContext()).toBe('edit');
        keyboard.switchContext('read');
        expect(keyboard.getCurrentContext()).toBe('read');
        const undoSwitch = keyboard.switchContext('invisible');
        expect(keyboard.getCurrentContext()).toBe('invisible');
        undoSwitch();
        expect(keyboard.getCurrentContext()).toBe('read');

        expect(() => {
            keyboard.switchContext('nonexistent context');
        }).toThrow();
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

        expect(() => {
            keyboard.on('nonexistent-command', () => {
                //
            });
        }).toThrow();

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
    it('onShortcutKeyMatch', () => {
        const keyboard = new Keyboard({
            anchor: document.body
        });
        const listener = jest.fn();
        keyboard.onShortcutKeyMatch('Ctrl+M', listener);

        const event = keydownEvent({
            ctrlKey: true,
            key: 'M'
        });

        keyboard.fire(event);

        expect(listener).toBeCalled();

        document.body.dispatchEvent(event);

        expect(listener).toBeCalledTimes(2);
    });

    it('pause and resume', () => {
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
        keyboard.switchContext('default_context');
        const copyEventListener = jest.fn();
        keyboard.on('copy', copyEventListener);

        const event = keydownEvent({
            ctrlKey: true,
            key: 'C'
        });

        keyboard.fire(event);

        expect(copyEventListener).toHaveBeenCalledTimes(1);

        keyboard.pause();

        keyboard.fire(event);

        expect(copyEventListener).toBeCalledTimes(1);

        keyboard.getAnchor().dispatchEvent(event);

        expect(copyEventListener).toBeCalledTimes(1);

        keyboard.resume();

        keyboard.fire(event);

        expect(copyEventListener).toBeCalledTimes(2);

        keyboard.getAnchor().dispatchEvent(event);

        expect(copyEventListener).toBeCalledTimes(3);
    });
    it('interceptor', () => {
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
        keyboard.switchContext('default_context');
        const copyEventListener = jest.fn();
        keyboard.on('copy', copyEventListener);

        const event = keydownEvent({
            ctrlKey: true,
            key: 'C'
        });

        const interceptor = jest.fn();
        interceptor.mockImplementation((e, next) => {
            next(e);
        });

        keyboard.addInterceptor(interceptor);

        const interceptor2 = jest.fn();

        const removeInterceptor2 = keyboard.addInterceptor(interceptor2);

        keyboard.fire(event);

        expect(interceptor).toBeCalled();
        expect(interceptor2).toBeCalled();
        expect(copyEventListener).not.toBeCalled();

        removeInterceptor2();

        keyboard.fire(event);

        expect(copyEventListener).toBeCalled();
    });
    it('combine key', () => {
        const keyboard = new Keyboard();
        keyboard.keymap({
            commands: {
                preview: 'Ctrl+K,V'
            },
            contexts: {
                edit: {
                    commands: ['preview']
                }
            }
        });

        const ctrlK = keydownEvent({
            ctrlKey: true,
            key: 'K'
        });
        const v = keydownEvent({
            key: 'V'
        });

        keyboard.switchContext('edit');

        const previewEventListener = jest.fn();

        keyboard.on('preview', previewEventListener);

        const matchPartChangeListener = jest.fn();

        keyboard.onMatchPartChange(matchPartChangeListener);

        keyboard.fire(ctrlK);

        expect(matchPartChangeListener).toBeCalled();

        expect(previewEventListener).not.toBeCalled();

        const partMatchShortcuts = keyboard.getPartMatchShortcuts();

        expect(partMatchShortcuts.length).toBe(1);

        expect(partMatchShortcuts[0].isPartMatch()).toBeTruthy();

        keyboard.fire(v);

        expect(previewEventListener).toBeCalled();

        previewEventListener.mockReset();

        keyboard.fire(ctrlK);

        keyboard.resetAll();

        keyboard.fire(v);

        expect(previewEventListener).not.toBeCalled();
    });
});
