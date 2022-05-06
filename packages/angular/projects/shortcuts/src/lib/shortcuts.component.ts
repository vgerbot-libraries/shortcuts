import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { ShortcutEvent } from '@vgerbot/shortcuts-core';
import { ShortcutsService } from './shortcuts.service';

@Component({
    selector: 'shortcuts[command]',
    styles: [],
    template: '<!-- &lt;shortcuts&gt; -->'
})
export class ShortcutsComponent implements OnInit, OnDestroy, OnChanges {
    @Input('command') commandName!: string;
    @Input('disabled') disabled: boolean = false;
    @Output('handle') emitter: EventEmitter<ShortcutEvent> =
        new EventEmitter<ShortcutEvent>();

    private removeEventListener = () => {
        // PASS;
    };

    constructor(@Inject(ShortcutsService) public service: ShortcutsService) {}

    ngOnInit(): void {
        this.registerEvent();
    }
    ngOnDestroy() {
        this.removeEventListener();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('command' in changes) {
            this.registerEvent();
        }
    }
    private registerEvent() {
        this.removeEventListener();
        this.removeEventListener = this.service
            .getKeyboard()
            .on(this.commandName, event => {
                if (this.disabled) {
                    return;
                }
                this.emitter.emit(event);
            });
    }
}
