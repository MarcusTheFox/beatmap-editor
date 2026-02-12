import { useEffect, useCallback } from "react";
import { KeyboardKey, MouseWheelDirection } from "../../types/shortcut";

export type KeyboardShortcut = {
    type: "keyboard";
    keys: KeyboardKey[];
    callback: ( event: KeyboardEvent ) => void;
    allowInInputs?: boolean;
};

export type ShortcutModifiers = {
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    meta: boolean;
};

export type WheelShortcut = {
    type: "wheel";
    direction: MouseWheelDirection;
    callback: ( event: WheelEvent ) => void;
    modifiers?: Partial<ShortcutModifiers>;
};

export type Shortcut = KeyboardShortcut | WheelShortcut;

export type UseShortcutsOptions = {
    target?: HTMLElement | Document | Window;
};

const isTypingElement = ( element: Element ): boolean => {
    const tagName = element.tagName.toLowerCase();
    const inputTypes = [ "input", "textarea", "select", "button" ];

    if ( inputTypes.includes( tagName )) {
        const inputElement = element as HTMLInputElement;
        const type = inputElement.type?.toLowerCase();

        if ( type === "button" || type === "checkbox" || type === "radio" || type === "submit" ) {
            return false;
        }
        return true;
    }

    return element.hasAttribute( "contenteditable" );
};

const normalizeKey = ( key: string ): KeyboardKey => {
    const mapping: Record<string, string> = {
        " ": "Space",
    };

    const normalized = mapping[key.toLowerCase()] || key;
    return normalized.charAt( 0 ).toUpperCase() + normalized.slice( 1 ) as KeyboardKey;
};

const getWheelDirection = ( event: WheelEvent ): MouseWheelDirection => {
    return event.deltaY > 0 ? "down" : "up";
};

export const useShortcuts = (
    shortcuts: Shortcut[],
    options: UseShortcutsOptions = {},
) => {
    const {
        target = typeof document !== "undefined" ? document : null,
    } = options;

    const handleKeyDown = useCallback(( event: KeyboardEvent ) => {
        const activeElement = document.activeElement;
        const isTyping = activeElement && isTypingElement( activeElement );

        const keyboardShortcuts = shortcuts.filter(( s ) => s.type === "keyboard" );

        for ( const shortcut of keyboardShortcuts ) {
            const { keys, callback, allowInInputs = false } = shortcut;

            if ( isTyping && !allowInInputs ) continue;

            const allKeysMatch: boolean = keys.every(( key ) => {
                const eventKey = normalizeKey( event.key );

                switch ( key ) {
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

            if ( !allKeysMatch ) continue;

            const hasExtraModifiers =
                ( !keys.includes( "Ctrl" ) && event.ctrlKey )
                || ( !keys.includes( "Meta" ) && event.metaKey )
                || ( !keys.includes( "Alt" ) && event.altKey )
                || ( !keys.includes( "Shift" ) && event.shiftKey );

            if ( hasExtraModifiers ) continue;

            event.preventDefault();
            event.stopPropagation();

            callback( event );
            break;
        }
    }, [ shortcuts ]);

    const handleWheel = useCallback(( event: WheelEvent ) => {
        const wheelShortcuts = shortcuts.filter(( s ) => s.type === "wheel" );
        const direction = getWheelDirection( event );

        for ( const shortcut of wheelShortcuts ) {
            if ( shortcut.direction !== direction ) continue;

            const { callback, modifiers } = shortcut;

            const modifiersMatch =
                ( !modifiers?.ctrl || event.ctrlKey )
                && ( !modifiers?.shift || event.shiftKey )
                && ( !modifiers?.alt || event.altKey )
                && ( !modifiers?.meta || event.metaKey );

            if ( !modifiersMatch ) continue;

            const hasExtraModifiers =
                ( !modifiers?.ctrl && event.ctrlKey )
                || ( !modifiers?.shift && event.shiftKey )
                || ( !modifiers?.alt && event.altKey )
                || ( !modifiers?.meta && event.metaKey );

            if ( hasExtraModifiers ) continue;

            event.preventDefault();
            event.stopPropagation();

            callback( event );
            break;
        }
    }, [ shortcuts ]);

    useEffect(() => {
        if ( !target ) return;

        const element = target instanceof Document ? target.documentElement : target;
        element.addEventListener( "keydown", handleKeyDown as EventListener );
        element.addEventListener( "wheel", handleWheel as EventListener, { passive: false });

        return () => {
            element.removeEventListener( "keydown", handleKeyDown as EventListener );
            element.removeEventListener( "wheel", handleWheel as EventListener );
        };
    }, [ target, handleKeyDown ]);
};

export const createKeyboardShortcut = (
    keys: KeyboardKey[],
    callback: ( event: KeyboardEvent ) => void,
    options?: Omit<KeyboardShortcut, "type" | "keys" | "callback">,
): KeyboardShortcut => ({
    type: "keyboard",
    keys,
    callback,
    ...options,
});

export const createWheelShortcut = (
    direction: MouseWheelDirection,
    callback: ( event: WheelEvent ) => void,
    modifiers?: Partial<ShortcutModifiers>,
): WheelShortcut => ({
    type: "wheel",
    direction,
    callback,
    modifiers,
});
