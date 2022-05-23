<p align="center">
    <img src="https://github.com/vgerbot-libraries/shortcuts/raw/master/logo.png" width="128" height="128"/>
</p>

# @vgerbot/shortcuts

[![Test](https://github.com/y1j2x34/shortcuts/actions/workflows/runtest.yml/badge.svg)](https://github.com/y1j2x34/shortcuts/actions/workflows/runtest.yml) [![CodeQL](https://github.com/vgerbot-libraries/shortcuts/workflows/CodeQL/badge.svg)](https://github.com/vgerbot-libraries/shortcuts/actions?query=workflow%3ACodeQL) [![Codacy Badge](https://app.codacy.com/project/badge/Coverage/08bfda65b05c4df8a98e38847eed9712)](https://www.codacy.com/gh/y1j2x34/shortcuts/dashboard?utm_source=github.com&utm_medium=referral&utm_content=y1j2x34/shortcuts&utm_campaign=Badge_Coverage) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/42d93433752e4bc290caa81857498ccc)](https://app.codacy.com/gh/y1j2x34/shortcuts?utm_source=github.com&utm_medium=referral&utm_content=y1j2x34/shortcuts&utm_campaign=Badge_Grade_Settings) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-round)](https://github.com/prettier/prettier) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@vgerbot/shortcuts)

## 🔌 Install

### Using npm/yarn

```bash
$ npm i @vgerbot/shortcuts
$ # or
$ yarn add @vgerbot/shortcuts
```

Then import/require the module:

```js
const { } = require('@vgerbot/shortcuts');
// or
import { } from '@vgerbot/shortcuts';
```

### Using CDN

1. jsDelivr:

    ```html
    <script src="//cdn.jsdelivr.net/npm/@vgerbot/shortcuts/lib/index.min.js"></script>
    ```

2. unpkg

    ```html
    <script src="//unpkg.com/@vgerbot/shortcuts/lib/index.min.js"></script>
    ```

Then:

```html
<script>
    const {} = Shortcuts;
</script>
```

## 📚 Usage

### Pattern matching

```js
import { match } from '@vgerbot/shortcuts';
const matcher = match
    .case('Ctrl+A', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}`)) // output when matching: Pressed 'Ctrl+A'
    .case('Mod+Z', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}'`)) // output when matching: Mac: `Pressed 'Meta+A'`, Win,Linux:`Pressed 'Ctrl+A'`
    .case('Ctrl+P|Shift+Ctrl+P', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}`)) // output when matching: `Pressed 'Ctrl+P'` or `Pressed 'Shift+Ctrl+P'`
    ;
document.body.addEventListener('keydown', e => {
    matcher(e);
})
```

You may omit `.case`.

```js
import { match } from '@vgerbot/shortcuts';
const matcher = match('Ctrl+A', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}`)) // output when matching: Pressed 'Ctrl+A'
    ('Mod+Z', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}'`)) // output when matching: Mac: `Pressed 'Meta+A'`, Win,Linux:`Pressed 'Ctrl+A'`
    ('Ctrl+P|Shift+Ctrl+P', (shortcutEvent) => console.log(`Pressed '${shortcutEvent.shortcut}`)) // output when matching: `Pressed 'Ctrl+P'` or `Pressed 'Shift+Ctrl+P'`
    ;
document.body.addEventListener('keydown', e => {
  matcher(e);
})
```

The result of the callback will be returned from matcher.

```js
import { match } from '@vgerbot/shortcuts';
const matcher =
    match('Ctrl+A', () => 'A')
    ('Ctrl+B', () => 'B')
document.body.addEventListener('keydown', e => {
  const result = matcher(e);
  console.log(result); // If there is no match, `undefined` will be returned.
})
```

If you provide a value instead of a function, that value will be returnd

```js
import { match } from '@vgerbot/shortcuts';
const matcher =
    match('Ctrl+A', 'A')
    ('Ctrl+B', 'B')
document.body.addEventListener('keydown', e => {
  const result = matcher(e);
  console.log(result);  // If there is no match, `undefined` will be returned.
})
```

You may use the `.else` to define a callback  if no shortcut pattern matches.

```js
import { match } from '@vgerbot/shortcuts';
const matcher =
    match('Ctrl+A', 'A')
    ('Ctrl+B', 'B')
    .else(() => console.log('no shortcut pattern matches'));
document.body.addEventListener('keydown', e => {
  matcher(e);
})
```

### Keymap configuration

```js
import { Keyboard } from '@vgerbot/shortcuts';
const keyboard = new Keyboard();
keyboard.keymap({
  commands: {
    copy: {
      shortcut: 'Ctrl+C',
      preventDefault: true
    },
    paste: {
      shortcut: 'Ctrl+V',
      preventDefault: true
    },
    print: 'Ctrl+P',
    find: 'Ctrl+F',
    replace: 'Ctrl+H',
    devtool: 'F12',
    close: 'Ctrl+W',
    confirm: {
      shortcut: 'Enter',
      interceptors: [
        (event, next) => {
          if(event.target.nodeName === 'INPUT') {
            return;
          }
          next(event);
        }
      ]
    }
  },
  contexts: {
    default: {
      commands: ['devtool', 'print']
    },
    closable: {
      abstract: true,
      commands: ['close']
    },
    searchable: {
      abstract: true,
      commands: ['find', 'replace']
    },
    editor: {
      commands: ['copy', 'paste'],
      fallbacks: ['closable', 'searchable']
    },
    previewer: {
      commands: ['print'],
      fallbacks: ['searchable']
    },
    dialog: {
      commands: ['confirm'],
      fallbacks: ['closable']
    }
  }
})
```

With the `keymap` method, we can easily override existing shortcut commands：

```js
keyboard.keymap({
    commands: {
        copy: {
            shortcut: 'Ctrl+Alt+C'
        }
    }
})
```

This feature is useful for applications that require custom shortcut keys.

#### Shortcut context

Now that we have everything configured, next we listen for keyboard events with the command name as the event name as shown below:

```js
keyboard.on('close', () => {
    console.log('close');
})
```

However, it does not work now because there is no `'close'` command for the current context. The event can only be responded to if the currently activated context keymap configuration contains the `'close'` command.

```js
keyboard.switchContext('editor');
```

When the user presses `Ctrl+W`, the close event will be executed.
When the context is switched to `previewer`, since `previewer` does not have a `close` command, the user presses `Ctrl+W` and the event is no longer triggered.

#### Fallback context

If a shortcut command is not found in current activated context, by default, the `shortcuts` will look for same command in `default` context, but if some context has been specified a fallback context, the `shortcuts` will look for that *fallback context* first.

### Shortcut macros

```js
import { Keyboard, macros } from '@vgerbot/shortcuts';
const keyboard = new Keyboard();
// These following defines the macros globally.
macros('Mod', isMac ? 'Meta' : 'Ctrl');
macros('Cs', e => {
    return e.crlKey && e.shifKey;
});
// or defines the macros for keyboard instance.
keyboard.macros('Mod', isMac ? 'Meta' : 'Ctrl');
keyboard.macros('Cs', e => {
    return e.crlKey && e.shifKey;
});
// After that, you can use macros like this:
keyboard.keymap({
    commands: {
        copy: 'Mod+C', // On Mac OS, it is equivalent to Meta+C, and other systems are equivalent to Ctrl+C
        capture: 'Cs+A' // Equivalent to Ctrl+Shift+A
    }
})
```
