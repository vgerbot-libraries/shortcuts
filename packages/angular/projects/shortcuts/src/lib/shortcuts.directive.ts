import {
    Directive,
    ElementRef,
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
    private removeKeyboardEvent = () => {
        // PASS
    };

    constructor(
        @Inject(Keyboard)
        private keyboard: Keyboard,
        private el: ElementRef
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
        this.removeKeyboardEvent = this.keyboard.on(this.commandName, () => {
            this.el.nativeElement.click();
        });
    }
    checkCommandName() {
        if (!this.commandName) {
            throw new Error('Attribute value of "shortcut" is required!');
        }
    }
}
