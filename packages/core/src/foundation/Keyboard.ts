import { EventEmitter } from '../event/EventEmitter';
import {
    DEFAULT_MACRO_REGISTRY,
    MacroRegistry,
    MacroRegistryImpl
} from '../macro/MacroRegistry';
import { Shortcut } from '../shortcut/Shortcut';
import { ActivationContextManager } from './ActivationContextManager';
import { Disposable } from './Disposable';
import { Interceptor } from './Interceptor';
import { KeyboardConstructorOptions } from './KeyboardConstructorOptions';
import {
    CommandOptions,
    ContextOptions,
    FullContextOptions,
    KeymapOptions,
    Opportunity,
    ParsedCommandOptions
} from './Keymap';
import { ShortcutEvent, ShortcutEventImpl } from './ShortcutEvent';
import { ShortcutEventHandler } from './ShortcutEventHandler';

export class Keyboard {
    private readonly commands: Record<string, ParsedCommandOptions> = {};
    private readonly contexts: Record<string, FullContextOptions> = {};
    private readonly activationContextManager = new ActivationContextManager();
    private readonly eventEmitter = new EventEmitter<ShortcutEvent>();
    private paused: boolean = false;
    private disposor = new Disposable();
    private anchor: GlobalEventHandlers;
    private eventOptions?: AddEventListenerOptions;
    private registry: MacroRegistry;
    constructor(
        options: KeyboardConstructorOptions = {
            anchor: document
        }
    ) {
        this.anchor = options.anchor || document;
        this.eventOptions = options.eventOptions;
        this.registry = new MacroRegistryImpl(
            options.macroRegistry || DEFAULT_MACRO_REGISTRY
        );
        this.registerEvents();
    }
    registerEvents() {
        const keyboardEventHandler = (e: KeyboardEvent) => {
            if (this.paused) {
                return;
            }
            switch (e.type) {
                case 'keydown':
                    this.handleKeyEvent(e);
                    break;
                case 'keyup':
                    this.handleKeyEvent(e);
                    break;
            }
        };
        this.anchor.addEventListener(
            'keydown',
            keyboardEventHandler,
            this.eventOptions
        );
        this.anchor.addEventListener(
            'keyup',
            keyboardEventHandler,
            this.eventOptions
        );
        this.disposor.record(() => {
            this.anchor.removeEventListener(
                'keydown',
                keyboardEventHandler,
                this.eventOptions
            );
            this.anchor.removeEventListener(
                'keyup',
                keyboardEventHandler,
                this.eventOptions
            );
        });
    }
    private handleKeyEvent(e: KeyboardEvent) {
        const currentContext = this.activationContextManager.peak();
        if (currentContext === undefined) {
            return;
        }
        // TODO: supports fallbacks
        const commands = this.commandsOf(currentContext);
        if (commands.length === 0) {
            return;
        }
        commands.forEach(it => {
            const opt = this.commands[it];
            const shortcut = opt?.shortcut;
            if (!shortcut) {
                return;
            }
            if (shortcut.match(e)) {
                this.executeCommand(e, it, opt);
            }
        });
    }
    private commandsOf(context: string): string[] {
        const fallbackContexts: FullContextOptions[] = [];
        const obtainFallbackContexts = (ctx: string) => {
            const options = this.contexts[ctx];
            if (!options) {
                return;
            }
            if (fallbackContexts.indexOf(options) > -1) {
                return;
            }
            fallbackContexts.push(options);
            options.fallbacks.forEach(obtainFallbackContexts);
        };
        obtainFallbackContexts(context);
        const allCommands = fallbackContexts.reduce((allCommands, it) => {
            return allCommands.concat(it.commands);
        }, [] as string[]);
        return allCommands.filter(
            (it, index) => allCommands.indexOf(it) === index
        );
    }
    private executeCommand(
        e: KeyboardEvent,
        commandName: string,
        commandOptions: ParsedCommandOptions
    ) {
        const includesTheConfiguredEventType =
            commandOptions.event.indexOf(e.type as Opportunity) > -1;
        if (!includesTheConfiguredEventType) {
            return;
        }
        const handleEvent = (e: ShortcutEvent) => {
            if (commandOptions.preventDefault) {
                e.preventDefault();
            }
            this.eventEmitter.emit(commandName, e);
        };
        const runner = commandOptions.interceptors.reduceRight(
            (next: ShortcutEventHandler, cur: Interceptor) => {
                return (evt: ShortcutEvent) => {
                    cur(evt, next);
                };
            },
            handleEvent
        );
        const shortcutEvent = new ShortcutEventImpl(commandOptions.shortcut, e);
        runner(shortcutEvent);
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
        const contextOptions = this.contexts[context];
        if (!contextOptions) {
            throw new Error(
                'Cannot switch to a non-existent context: ' + context
            );
        }
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
                    shortcut: Shortcut.from(options, this.registry),
                    preventDefault: false,
                    event: ['keydown'],
                    interceptors: []
                };
            } else {
                this.commands[commandName] = {
                    shortcut: Shortcut.from(options.shortcut, this.registry),
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
