import { ModuleWithProviders, NgModule } from '@angular/core';
import { Keyboard } from '@shortcuts/core';
import { SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN } from './injection.tokens';
import { ShortcutsComponent } from './shortcuts.component';
import { ShortcutsService } from './shortcuts.service';
import { ShortcutsModuleOptions } from './ShortcutsModuleOptions';

@NgModule({
    declarations: [ShortcutsComponent],
    imports: [],
    exports: [ShortcutsComponent]
})
export class ShortcutsModule {
    static forRoot(
        options: ShortcutsModuleOptions = {}
    ): ModuleWithProviders<ShortcutsModule> {
        return {
            ngModule: ShortcutsModule,
            providers: [
                {
                    provide: SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN,
                    useValue: options
                },
                ShortcutsService,
                {
                    provide: Keyboard,
                    useFactory: (shortcutService: ShortcutsService) => {
                        console.log('shortcutsService', shortcutService);
                        return shortcutService.getKeyboard();
                    },
                    deps: [ShortcutsService]
                }
            ]
        };
    }
}