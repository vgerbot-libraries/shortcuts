import { ModuleWithProviders, NgModule } from '@angular/core';
import { Keyboard } from '@shortcuts/core';
import { SHORTCUTS_MODULE_OPTIONS_PROVIDER_TOKEN } from './injection.tokens';
import { ShortcutsComponent } from './shortcuts.component';
import { ShortcutsService } from './shortcuts.service';
import { ShortcutsModuleOptions } from './ShortcutsModuleOptions';
import { ShortcutsAnchorDirective } from './shortcuts-anchor.directive';

@NgModule({
    declarations: [ShortcutsComponent, ShortcutsAnchorDirective],
    imports: [],
    exports: [ShortcutsComponent, ShortcutsAnchorDirective]
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
