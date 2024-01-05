# @vgerbot/shortcuts-rxjs

<p align="center">
    <img src="https://github.com/vgerbot-libraries/shortcuts/raw/master/logo.png" width="128" height="128"/>
</p>

[![Test](https://github.com/y1j2x34/shortcuts/actions/workflows/runtest.yml/badge.svg)](https://github.com/y1j2x34/shortcuts/actions/workflows/runtest.yml) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/42d93433752e4bc290caa81857498ccc)](https://app.codacy.com/gh/y1j2x34/shortcuts?utm_source=github.com&utm_medium=referral&utm_content=y1j2x34/shortcuts&utm_campaign=Badge_Grade_Settings) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-round)](https://github.com/prettier/prettier) ![npm (scoped)](https://img.shields.io/npm/v/@vgerbot/shortcuts-rxjs) [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/y1j2x34/vgerbot-libraries/blob/master/LICENSE)

A powerful package providing [`@vgerbot/shortcuts`](https://npmjs.com/@vgerbot/shortcuts) helper functions for seamless integration with RxJS.

## 🔌 Installation

You can install the package effortlessly using NPM:

```bash
npm install @vgerbot/shortcuts-rxjs
```

## 💪 Features

- RxJS Observable factories: `fromShortcutKeyEvent` and `fromShortcutCommandEvent`
- RxJS operator: `shortcut`

### 🏭 [`fromShortcutKeyEvent`](https://github.com/y1j2x34/shortcuts/blob/HEAD/packages/rxjs/src/fromShortcutKeyEvent.ts)

> Create an Observable that emits events for specific keyboard shortcuts from the provided event target.

```typescript
fromShortcutKeyEvent<T>(target: EventTargetLike, shortcutKey: string, eventName?: 'keydown' | 'keyup', options?: EventListenerOptions, selector?: SelectorMethodSignature<T>): Observable<T>;
```

#### Parameters

|   Parameter   | Type                                                                                                                                   | Description                                                                        |
|:-------------:|:---------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------|
|   `target`    | `EventTargetLike`                                                                                                                      | The DOM Event Target, NodeList, or HTML Collection to attach the event handler to. |
| `shortcutKey` | `string`                                                                                                                               | Keyboard shortcut, e.g., `Ctrl+A`, `Ctrl+Shift+B`.                                 |
|   `options`   | `{ eventListenerOptions?: EventListenerOptions \| boolean; eventName?: 'keydown' \| 'keyup'; selector?: SelectorMethodSignature<T>; }` | Optional parameters to customize the behavior of the shortcut event handling.      |

#### Returns

`Observable<T>`: An Observable that emits events when the specified keyboard shortcut is detected.

#### Example

```typescript
import { fromShortcutKeyEvent } from '@vgerbot/shortcuts-rxjs';

const targetElement = document.getElementById('myElement');
const shortcutKey = 'Ctrl+A';

const shortcutObservable = fromShortcutKeyEvent(targetElement, shortcutKey);

shortcutObservable.subscribe(event => {
    // Handle the event for the specified keyboard shortcut
    console.log('Shortcut event detected:', event);
});
```

### 🏭 [`fromShortcutCommandEvent`](https://github.com/y1j2x34/shortcuts/blob/HEAD/packages/rxjs/src/fromShortcutCommandEvent.ts)

> Create an Observable that emits events for a specific command from the Keyboard instance.

```typescript
fromShortcutCommandEvent(keyboard: Keyboard, command: string, options?: Partial<AddShortcutEventOptions>): Observable<ShortcutEvent>
```

#### Parameters

| Parameter  | Type                               | Description                                    |
|:----------:|:-----------------------------------|:-----------------------------------------------|
| `keyboard` | `Keyboard`                         | Keyboard manager                               |
| `command`  | `string`                           | Shortcut command                               |
| `options`  | `Partial<AddShortcutEventOptions>` | *Optional.* Options to pass to `Keyboard.on()` |

#### Returns

`Observable<ShortcutEvent>`: An Observable that emits events when the specified command is triggered.

#### Example

```typescript
import { Keyboard } from '@vgerbot/shortcuts';
import { fromShortcutCommandEvent } from '@vgerbot/shortcuts-rxjs';

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
      console.log('Reload page', e);
    });
```

### 🌈 `shortcut` Operator for Use with Pipes

> Filter items emitted by the source Observable created by `fromEvent` to listen for keyboard events and only emit items that match the specified shortcut key.

```typescript
shortcut(shortcutKey: string): MonoTypeOperatorFunction<T>
```

#### Parameters

|   Parameter   | Type     | Description                                       |
|:-------------:|:---------|:--------------------------------------------------|
| `shortcutKey` | `string` | Keyboard shortcuts, e.g. `Ctrl+A`, `Ctrl+Shift+B` |

#### Returns

`MonoTypeOperatorFunction<T>`: A function that returns an Observable that emits items matching the shortcut key.

## 📘 License

The `@vgerbot/shortcuts-rxjs` library is released under the under terms of the [MIT License](../../LICENSE)