import {
    Directive,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { Keyboard, ShortcutEvent } from '@shortcuts/core';

@Directive({
    selector: '[shortcut]'
})
export class ShortcutDirective implements OnInit, OnChanges, OnDestroy {
    @Input('shortcut') commandName: string = '';
    @Output('shortcut-event') keyboardEvent: EventEmitter<ShortcutEvent> =
        new EventEmitter<ShortcutEvent>();

    private removeKeyboardEvent = () => {
        // PASS
    };

    constructor(
        @Inject(Keyboard)
        private keyboard: Keyboard
    ) {}
    ngOnInit() {
        this.checkCommandName();
        this.registerEvent();
    }
    ngOnChanges(changes: SimpleChanges) {
        if ('commandName' in changes) {
            this.checkCommandName();
            this.registerEvent();
        }
    }
    ngOnDestroy() {
        this.removeKeyboardEvent();
    }
    registerEvent() {
        this.removeKeyboardEvent();
        this.removeKeyboardEvent = this.keyboard.on(this.commandName, e => {
            this.keyboardEvent.emit(e);
        });
    }
    checkCommandName() {
        if (!this.commandName) {
            throw new Error('Attribute value of "shortcut" is required!');
        }
    }
}
