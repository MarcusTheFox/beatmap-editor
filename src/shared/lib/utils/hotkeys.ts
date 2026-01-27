import { useEffect, useCallback, useRef } from 'react';
import { KeyboardKey } from '../../types/keyboardKey';

export type Hotkey = {
    keys: KeyboardKey[],
    callback: (event: KeyboardEvent) => void;
    allowInInputs?: boolean;
}

const isTypingElement = (element: Element): boolean => {
    const tagName = element.tagName.toLowerCase();
    const inputTypes = ['input', 'textarea', 'select', 'button'];
    
    if (inputTypes.includes(tagName)) {
        const inputElement = element as HTMLInputElement;
        const type = inputElement.type?.toLowerCase();
        
        if (type === 'button' || type === 'checkbox' || type === 'radio' || type === 'submit') {
            return false;
        }
        return true;
    }
    
    return element.hasAttribute('contenteditable');
};

const normalizeKey = (key: string): string => {
    const mapping: Record<string, string> = {
        ' ': 'Space',
    };

    const normalized = mapping[key.toLowerCase()] || key;
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export const useHotkeys = ( hotkeys: Hotkey[] ) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const activeElement = document.activeElement;
        const isTyping = activeElement && isTypingElement(activeElement);

        for (const hotkey of hotkeys) {
            const { keys, callback, allowInInputs = false } = hotkey;
            
            if (isTyping && !allowInInputs) continue;

            let allKeysMatch: boolean = keys.every(key => {
                const eventKey = normalizeKey(event.key);

                switch (key) {
                    case "Ctrl":
                        return event.ctrlKey;
                    case "Meta":
                        return event.metaKey;
                    case "Alt":
                        return event.altKey;
                    case "Shift":
                        return event.shiftKey;
                    default:
                        return eventKey === key;
                }
            });

            if (allKeysMatch) {
                const hasExtraModifiers =
                    (!keys.includes("Ctrl") && event.ctrlKey) ||
                    (!keys.includes("Meta") && event.metaKey) ||
                    (!keys.includes("Alt") && event.altKey) ||
                    (!keys.includes("Shift") && event.shiftKey);
                
                if (hasExtraModifiers) {
                    allKeysMatch = false;
                }
            }

            if (allKeysMatch) {
                event.preventDefault();
                event.stopPropagation();

                callback(event);
                break;
            }
        }
    }, [ hotkeys ]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [window, handleKeyDown]);
}

export const createHotkey = (
    keys: KeyboardKey[],
    callback: (event: KeyboardEvent) => void,
    options?: Omit<Hotkey, 'keys' | 'callback'>
): Hotkey => ({
    keys,
    callback,
    ...options
})