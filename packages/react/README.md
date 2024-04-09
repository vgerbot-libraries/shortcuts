# @vgerbot/shortcuts-react

`@vgerbot/shortcuts-react` is a React library that provides a set of hooks and components for easily integrating keyboard shortcuts into your React applications. It is built on top of the `@vgerbot/shortcuts` library, which handles the underlying keyboard event management.

## Installation

```bash
npm install @vgerbot/shortcuts-react
```

## Usage

### `KeyboardProvider`

The `KeyboardProvider` component is a React context provider that manages the keyboard instance and its options. It should be wrapped around the parts of your application where you want to use keyboard shortcuts.

```jsx
import { KeyboardProvider } from '@vgerbot/shortcuts-react';

const App = () => (
  <KeyboardProvider>
    {/* Your app components */}
  </KeyboardProvider>
);
```

You can pass options to the `KeyboardProvider` to configure the keyboard instance:

```jsx
<KeyboardProvider anchor={document.body}>
  {/* Your app components */}
</KeyboardProvider>
```

### `useKeyboard`

The `useKeyboard` hook returns the `Keyboard` instance, which provides access to various methods for advanced keyboard management. With the keyboard instance, you can register or unregister shortcut commands, add event interceptors, switch keyboard contexts, and more.

```jsx
import { useKeyboard } from '@vgerbot/shortcuts-react';

const MyComponent = () => {
    const keyboard = useKeyboard();

    useEffect(() => {
        // Register a shortcut
        const unregister = keyboard.on('save', () => {
          console.log('Shortcut command triggered!');
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
        return () => unregister();
    }, [keyboard]);

};
```

### `useCommand`

The `useCommand` hook registers a keyboard shortcut with a provided command string and callback function.

```jsx
import { useCommand } from '@vgerbot/shortcuts-react';

const MyComponent = () => {
  useCommand('save', () => {
    console.log('Shortcut triggered!');
  });

  // ...
};
```

### `useShortcutKeyMatch`

The `useShortcutKeyMatch` hook registers a keyboard shortcut with a provided shortcut object or string and callback function.

```jsx
import { useShortcutKeyMatch } from '@vgerbot/shortcuts-react';

const MyComponent = () => {
  useShortcutKeyMatch('Ctrl+S', () => {
    console.log('Shortcut triggered!');
  });

  // ...
};
```

## Contributing

Contributions are welcome! Please read the [contributing guide](https://github.com/vgerbot-libraries/shortcuts/contributing.md) for more information.
