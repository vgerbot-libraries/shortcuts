<p align="center">
    <img src="https://github.com/vgerbot-libraries/shortcuts/raw/master/logo.png" width="128" height="128"/>
</p>

# @vgerbot/shortcuts-rxjs 

[![Test](https://github.com/y1j2x34/shortcuts/actions/workflows/runtest.yml/badge.svg)](https://github.com/y1j2x34/shortcuts/actions/workflows/runtest.yml)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/42d93433752e4bc290caa81857498ccc)](https://app.codacy.com/gh/y1j2x34/shortcuts?utm_source=github.com&utm_medium=referral&utm_content=y1j2x34/shortcuts&utm_campaign=Badge_Grade_Settings) 
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-round)](https://github.com/prettier/prettier)
![npm (scoped)](https://img.shields.io/npm/v/@vgerbot/shortcuts-rxjs)
[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/y1j2x34/vgerbot-libraries/blob/master/LICENSE)

A package that contains `@vgerbot/shortcut` helper functions for use with RxJS.

## :electric_plug: Install

Install the package using NPM:

```bash
npm install @vgerbot/shortcuts-rxjs
```

## :muscle: What's in it?

- Rxjs Observable factories: `fromShortcutKeyEvent` and `fromShortcutCommandEvent`;
- Rxjs operator: `shortcut`.

### :factory: [`fromShortcutKeyEvent`](https://github.com/y1j2x34/shortcuts/blob/HEAD/packages/rxjs/src/fromShortcutKeyEvent.ts)

> Creates an Observable that emits event of a specific shortcuts coming from the given event target.
>

`fromShortcutKeyEvent<T>(target: EventTargetLike, shortcutKey: string, eventName?: 'keydown' | 'keyup', options?: EventListenerOptions, selector?: SelectorMethodSignature<T>): Observable<T>;`

#### Parameters

|    Parameter     | Type                                                   | Description                                                                               |
|:----------------:|:-------------------------------------------------------|:------------------------------------------------------------------------------------------|
|     `target`     | `EventTargetLike`                                      | The DOM Event Target, NodeList or HTML Collection to attach the event handler to.         |
|  `shortcutKey`   | `string`                                               | Keyboard shortcut, e.g. `Ctrl+A`, `Ctrl+Shift+B`                                          |
|   `eventName`    | `'keydown'`&#124;`'keyup'`                             | Optional, Default is `'keydown'`, The keyboard event name, being emitted by the `target`. |
|    `options`     | 	`EventListenerOptions`&#124;`((...args: any[]) => T)` | Optional. Default is `undefined`. Options to pass through to addEventListener             |
| `resultSelector` | `(...args: any[]) => T`                                | Optional. Default is undefined.                                                           |

#### Returns

`Observable<T>`.

#### Example

```ts
import { fromShortcutKeyEvent } from '@vgerbot/shortcuts-rxjs';

fromShortcutKeyEvent(document, 'Ctrl+Alt+K', 'keydown', true)
    .subscribe((e) => {
      console.log('shortcut event from document');
    });
```

### :factory: [`fromShortcutCommandEvent`](https://github.com/y1j2x34/shortcuts/blob/HEAD/packages/rxjs/src/fromShortcutCommandEvent.ts)

> Creates an Observable that emits event of a specific command coming from the Keyboard instance.
>

`fromShortcutCommandEvent(keyboard: Keyboard, command: string, options?: Partial<AddShortcutEventOptions>): Observable<ShortcutEvent>`

#### Parameters

| Parameter  | Type                               | Description                                  |
|:----------:|:-----------------------------------|:---------------------------------------------|
| `keyboard` | `Keyboard`                         | Keyboard manager                             |
| `command`  | `string`                           | Shortcut command                             |
| `options`  | `Partial<AddShortcutEventOptions>` | Optional. Options to pass to `Keyboard.on()` |

#### Returns

`Observable<ShortcutEvent>`.

#### Example

```ts
import { Keyboard } from '@vgerbot/shortcuts';
import { fromShortutCommandEvent } from '@vgerbot/shortcuts-rxjs';

const keyboard = new Keyboad();

keyboard.keymap({
    contexts: {
        global: {
            commands: ['reload']
        }
    },
    commands: {
        reload: 'Ctrl+R'
    }
});

keyboard.switchContext('global');

fromShortcutCommandEvent(keyboard, 'reload')
    .pipe(e => {
      console.log('reload page', e);
    });

```

### :rainbow: `shortcut` operator for use with pipes

> Filter items emitted by the source Observable created by `fromEvent' to listen for keyboard events and only emit items that match the specified shortcut key.
> 

`shortcut(shortcutKey: string): MonoTypeOperatorFunction<T>`.

#### Parameters

|   Parameter   | Type     | Description                                       |
|:-------------:|:---------|:--------------------------------------------------|
| `shortcutKey` | `string` | Keyboard shortcuts, e.g. `Ctrl+A`, `Ctrl+Shift+B` |

#### Returns

`MonoTypeOperatorFunction<T>`: A function that returns an Observable that emits items matching the shortcut key.

## :blue_book: License

The `@vgerbot/shortcuts-rxjs` library is released under the under terms of the [MIT License](../../LICENSE)
