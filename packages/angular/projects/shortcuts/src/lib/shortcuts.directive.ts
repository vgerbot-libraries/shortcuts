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
import { Keyboard, createEvent, NativeEventType } from '@shortcuts/core';

@Directive({
    selector: '[shortcuts][command]'
})
export class ShortcutsDirective implements OnInit, OnChanges, OnDestroy {
    @Input('command') commandName: string = '';
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
            const event = createEvent(this.eventType);
            this.el.nativeElement.dispatchEvent(event);
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
