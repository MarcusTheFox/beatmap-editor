export type ModifierKey = "Ctrl" | "Shift" | "Alt" | "Meta";
export type SpecialKey =
    | "Escape" | "Enter" | "Tab" | "Space" | "Backspace" | "Delete"
    | "Insert" | "Home" | "End" | "PageUp" | "PageDown"
    | "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
    | "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12"
    | "CapsLock" | "NumLock" | "ScrollLock" | "PrintScreen" | "Pause"
    | "ContextMenu" | "Help";

export type NumberKey =
    | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
    | "Numpad0" | "Numpad1" | "Numpad2" | "Numpad3" | "Numpad4"
    | "Numpad5" | "Numpad6" | "Numpad7" | "Numpad8" | "Numpad9"
    | "NumpadAdd" | "NumpadSubtract" | "NumpadMultiply" | "NumpadDivide"
    | "NumpadDecimal" | "NumpadEnter" | "NumpadEqual";

export type LetterKey =
    | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
    | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"

    | "А" | "Б" | "В" | "Г" | "Д" | "Е" | "Ё" | "Ж" | "З" | "И" | "Й" | "К" | "Л" | "М"
    | "Н" | "О" | "П" | "Р" | "С" | "Т" | "У" | "Ф" | "Х" | "Ц" | "Ч" | "Ш" | "Щ"
    | "Ъ" | "Ы" | "Ь" | "Э" | "Ю" | "Я";

export type SymbolKey =
    | "`" | "~" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*" | "(" | ")"
    | "-" | "_" | "=" | "+" | "[" | "{" | "]" | "}" | "\\" | "|" | ";" | ":"
    | "'" | "\"" | "," | "<" | "." | ">" | "/" | "?" | " ";

export type KeyboardKey = ModifierKey | SpecialKey | NumberKey | LetterKey | SymbolKey;

export type MouseWheelDirection = "up" | "down";
