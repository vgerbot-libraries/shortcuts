import { TestBed, inject } from '@angular/core/testing';
import { Keyboard } from '@vgerbot/shortcuts';
import { ShortcutsModule } from './shortcuts.module';

describe('Keyboard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule(ShortcutsModule.forRoot({}));
    });

    it('should be created', inject([Keyboard], (keyboard: Keyboard) => {
        expect(keyboard).toBeTruthy();
    }));
});
