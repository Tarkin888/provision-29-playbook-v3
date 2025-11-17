import { useEffect } from 'react';

type KeyboardShortcutHandler = (event: KeyboardEvent) => void;

interface UseKeyboardShortcutOptions {
  enabled?: boolean;
  preventDefault?: boolean;
}

export const useKeyboardShortcut = (
  keys: string[],
  handler: KeyboardShortcutHandler,
  options: UseKeyboardShortcutOptions = {}
) => {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if all keys in the combination are pressed
      const isMatch = keys.every(key => {
        switch (key.toLowerCase()) {
          case 'ctrl':
          case 'control':
            return event.ctrlKey;
          case 'cmd':
          case 'meta':
            return event.metaKey;
          case 'shift':
            return event.shiftKey;
          case 'alt':
            return event.altKey;
          default:
            return event.key.toLowerCase() === key.toLowerCase();
        }
      });

      if (isMatch) {
        if (preventDefault) {
          event.preventDefault();
        }
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keys, handler, enabled, preventDefault]);
};

// Predefined shortcuts
export const SHORTCUTS = {
  SEARCH: ['Meta', 'k'], // Cmd/Ctrl + K
  SEARCH_ALT: ['Control', 'k'],
  FOCUS_SEARCH: ['/'],
  ESCAPE: ['Escape'],
  ARROW_UP: ['ArrowUp'],
  ARROW_DOWN: ['ArrowDown'],
  ENTER: ['Enter'],
  HELP: ['?'],
};
