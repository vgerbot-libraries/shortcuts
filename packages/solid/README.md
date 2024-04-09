# @vgerbot/shortcuts-solid

`@vgerbot/shortcuts-solid` is a Solid.js library that provides a set of utilities for easily integrating keyboard shortcuts into your Solid.js applications. It is built on top of the `@vgerbot/shortcuts` library, which handles the underlying keyboard event management.

## Installation

```bash
npm install @vgerbot/shortcuts-solid
```

## Usage

### `KeyboardProvider`

The `KeyboardProvider` component is a Solid.js context provider that manages the keyboard instance and its options. It should be wrapped around the parts of your application where you want to use keyboard shortcuts.

```jsx
import { KeyboardProvider } from '@vgerbot/shortcuts-solid';

const App = () => (
  <KeyboardProvider>
    {/* Your app components */}
  </KeyboardProvider>
);
```

You can pass options to the `KeyboardProvider` to configure the keyboard instance:

```jsx
<KeyboardProvider preventDefault stopPropagation>
  {/* Your app components */}
</KeyboardProvider>
```

### `useKeyboard`

The `useKeyboard` hook returns a function that provides the keyboard instance, which can be used to register or unregister shortcut commands, add event interceptors, switch keyboard contexts, and more optionals manually. It also accepts an optional callback function that will be called with the keyboard instance.

```jsx
import { useKeyboard } from '@vgerbot/shortcuts-solid';

const MyComponent = () => {
  const getKeyboard = useKeyboard((keyboard) => {
    // Register a shortcut
    const unregister = keyboard.register('save', () => {
      console.log('Shortcut triggered!');
    });
    // Add an event interceptor
    keyboard.addInterceptor((event, next) => {
      // Intercept and handle keyboard events
      // ...
      return next(event);
    });

    // Switch keyboard context
    keyboard.switchContext('editor');
        
    // Unregister the shortcut
    return unregister;
  });

  // Get the keyboard instance
  const keyboard = getKeyboard();

  // ...
};
```

### `useCommand`

The `useCommand` hook registers a keyboard shortcut with a provided command string and callback function.

```jsx
import { useCommand } from '@vgerbot/shortcuts-solid';

const MyComponent = () => {
  useCommand('Ctrl+S', () => {
    console.log('Shortcut triggered!');
  });

  // ...
};
```

### `useShortcutKeyMatch`

The `useShortcutKeyMatch` hook registers a keyboard shortcut with a provided shortcut object or string and callback function.

```jsx
import { useShortcutKeyMatch } from '@vgerbot/shortcuts-solid';

const MyComponent = () => {
  useShortcutKeyMatch('Ctrl+S', () => {
    console.log('Shortcut triggered!');
  });

  // ...
};
```
