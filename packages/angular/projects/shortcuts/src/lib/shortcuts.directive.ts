import {
    Directive,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { Keyboard, NativeEventType } from '@vgerbot/shortcuts-core';

@Directive({
    selector: '[shortcut]'
})
export class ShortcutsDirective implements OnInit, OnChanges, OnDestroy {
    @Input('shortcut') commandName: string = '';
    @Input('event-type') eventType: NativeEventType = 'click';

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
        if ('command' in changes) {
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
            throw new Error(
                '[shortcuts directive]: Attribute value of "command" is required!'
            );
        }
    }
}
