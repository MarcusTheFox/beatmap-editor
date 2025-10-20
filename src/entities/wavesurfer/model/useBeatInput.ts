import { useEffect, useRef, useState } from "react";
import { WaveSurferControls } from "./useWaveSurfer";

export const useBeatInput = (controls: WaveSurferControls | null) => {
    const [ isEditing, setIsEditing ] = useState<boolean>(false);
    const [ inputValue, setInputValue ] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        controls?.setBeat(Number(inputValue));
        setIsEditing(false);
    }

    const handleDisplayClick = () => {
        if (!controls) return;
        setIsEditing(true);
        setInputValue(controls.getBeat().toFixed(3))
    }

    const handleInputBlur = () => {
        setIsEditing(false);
    }
    
    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);

    return {
        isEditing,
        inputValue,
        inputRef,

        setInputValue,
        handleSubmit,
        handleDisplayClick,
        handleInputBlur
    }
}