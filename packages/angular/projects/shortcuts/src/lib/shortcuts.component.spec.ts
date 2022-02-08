import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutsComponent } from './shortcuts.component';
import { ShortcutsModule } from './shortcuts.module';

describe('ShortcutsComponent', () => {
    let component: ShortcutsComponent;
    let fixture: ComponentFixture<ShortcutsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(
            ShortcutsModule.forRoot({
                keymap: {
                    commands: {
                        copy: 'Ctrl+A'
                    }
                }
            })
        ).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShortcutsComponent);
        component = fixture.componentInstance;
        component.commandName = 'copy';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
