import { Injector } from '@angular/core';
import { AddShortcutEventOptions } from '@vgerbot/shortcuts-core';
import { ShortcutsService } from './shortcuts.service';

interface IShortcutsEventHandler {
    injector: Injector;
    ngOnInit?: Function;
    ngOnDestroy?: Function;
}
type Obj = {
    [key: string | symbol]: any;
};
function noop() {
    // PASS
}
export function OnShortcutKey(
    shortcutKey: string,
    options?: Partial<AddShortcutEventOptions>
) {
    return function (
        classProto: IShortcutsEventHandler,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        if (typeof (classProto as Obj)[propertyKey] != 'function') {
            throw new Error('Shortkey decorator can only be used on function');
        }
        const ngOnInitUnpatched = classProto.ngOnInit;
        const unbindEvent = noop;
        classProto.ngOnInit = function (this: IShortcutsEventHandler) {
            const method = (this as Obj)[propertyKey] as Function;
            const shortcutsService = this.injector.get(ShortcutsService);
            shortcutsService.getKeyboard().onShortcutKeyMatch(
                shortcutKey,
                event => {
                    method.call(this, event);
                },
                options
            );
            if (ngOnInitUnpatched) {
                return ngOnInitUnpatched.call(this);
            }
        };
        const ngOnDestroyUnpatched = classProto.ngOnDestroy;
        classProto.ngOnDestroy = function (this: IShortcutsEventHandler) {
            unbindEvent();
            if (ngOnDestroyUnpatched) {
                return ngOnDestroyUnpatched.call(this);
            }
        };
        return descriptor;
    };
}

export function OnShortcutCommand(
    command: string,
    options?: Partial<AddShortcutEventOptions>
) {
    return function (
        classProto: IShortcutsEventHandler,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        if (typeof (classProto as Obj)[propertyKey] != 'function') {
            throw new Error('Shortkey decorator can only be used on function');
        }
        const ngOnInitUnpatched = classProto.ngOnInit;
        const unbindEvent = noop;
        classProto.ngOnInit = function (this: IShortcutsEventHandler) {
            const method = (this as Obj)[propertyKey] as Function;
            const shortcutsService = this.injector.get(ShortcutsService);
            shortcutsService.on(
                command,
                event => {
                    method.call(this, event);
                },
                options
            );
            if (ngOnInitUnpatched) {
                return ngOnInitUnpatched.call(this);
            }
        };
        const ngOnDestroyUnpatched = classProto.ngOnDestroy;
        classProto.ngOnDestroy = function (this: IShortcutsEventHandler) {
            unbindEvent();
            if (ngOnDestroyUnpatched) {
                return ngOnDestroyUnpatched.call(this);
            }
        };
        return descriptor;
    };
}
