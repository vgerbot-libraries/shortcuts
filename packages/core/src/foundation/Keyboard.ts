import { EventEmitter } from '../event/EventEmitter';
import { ActivationContextManager } from './ActivationContextManager';
import { Disposable } from './Disposable';
import {
    CommandOptions,
    ContextOptions,
    FullCommandOptions,
    FullContextOptions,
    KeymapOptions,
    Opportunity
} from './Keymap';
import { ShortcutEvent } from './ShortcutEvent';
import { ShortcutEventHandler } from './ShortcutEventHandler';

export class Keyboard {
    private readonly commands: Record<string, FullCommandOptions> = {};
    private readonly contexts: Record<string, FullContextOptions> = {};
    private readonly activationContextManager = new ActivationContextManager();
    private readonly eventEmitter = new EventEmitter<ShortcutEvent>();
    private paused: boolean = false;
    private disposor = new Disposable();
    constructor(
        private anchor: GlobalEventHandlers = document,
        private options?: AddEventListenerOptions
    ) {
        this.registerEvents();
    }
    registerEvents() {
        const keyboardEventHandler = (e: KeyboardEvent) => {
            if (this.paused) {
                return;
            }
            switch (e.type) {
                case 'keydown':
                    this.handleKeydownEvent(e);
                    break;
                case 'keyup':
                    this.handleKeyupEvent(e);
                    break;
            }
        };
        this.anchor.addEventListener(
            'keydown',
            keyboardEventHandler,
            this.options
        );
        this.anchor.addEventListener(
            'keyup',
            keyboardEventHandler,
            this.options
        );
        this.disposor.record(() => {
            this.anchor.removeEventListener(
                'keydown',
                keyboardEventHandler,
                this.options
            );
            this.anchor.removeEventListener(
                'keyup',
                keyboardEventHandler,
                this.options
            );
        });
    }
    handleKeydownEvent(e: KeyboardEvent) {
        //
    }
    handleKeyupEvent(e: KeyboardEvent) {
        //
    }
    keymap(keymapOptions: KeymapOptions) {
        const commands = keymapOptions.commands;
        if (commands) {
            this.recordCommands(commands);
        }
        const contexts = keymapOptions.contexts;
        if (contexts) {
            this.recordContexts(contexts);
        }
    }
    switchContext(context: string) {
        return this.activationContextManager.push(context);
    }
    on(
        command: string,
        handler: ShortcutEventHandler,
        type: Opportunity = 'keydown'
    ) {
        if (!this.commands[command]) {
            throw new Error(
                // eslint-disable-next-line max-len
                `Command has not been registered: ${command}, please make sure that the keymap configuration and the spelling are correct!`
            );
        }
        return this.eventEmitter.on(command, e => {
            if (e.native.type !== type) {
                return;
            }
            if (this.paused) {
                return;
            }
            handler(e);
        });
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }
    destroy() {
        this.disposor.destroy();
    }
    private recordCommands(commands: Record<string, CommandOptions | string>) {
        for (const commandName in commands) {
            const options = commands[commandName];
            if (typeof options === 'string') {
                this.commands[commandName] = {
                    shortcut: options,
                    preventDefault: false,
                    event: ['keydown'],
                    interceptors: []
                };
            } else {
                this.commands[commandName] = {
                    shortcut: options.shortcut,
                    event: options.event || ['keydown'],
                    preventDefault: options.preventDefault !== false,
                    interceptors: options.interceptors || []
                };
            }
        }
    }
    private recordContexts(contexts: Record<string, ContextOptions>) {
        for (const name in contexts) {
            const contextOption = contexts[name];
            this.contexts[name] = {
                commands: contextOption.commands,
                abstract: contextOption.abstract === true,
                fallbacks: contextOption.fallbacks || []
            };
        }
    }
}
