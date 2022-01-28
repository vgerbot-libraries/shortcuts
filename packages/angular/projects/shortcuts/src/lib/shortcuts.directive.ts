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
import { Keyboard } from '@shortcuts/core';

@Directive({
    selector: '[shortcuts][command]'
})
export class ShortcutsDirective implements OnInit, OnChanges, OnDestroy {
    @Input('command') commandName: string = '';
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
