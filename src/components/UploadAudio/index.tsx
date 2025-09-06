import { Button, ButtonProps } from "@heroui/button";
import { Input } from "@heroui/input";
import { ReactNode, useRef } from "react";

interface UploadButtonProps extends ButtonProps {
    children?: ReactNode;
    accept?: string | undefined;
    onFileSelect?: (file: File | null) => void;
}

export function UploadButton(props: UploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { children, accept, onFileSelect, ...buttonProps } = props;

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (onFileSelect) {
            onFileSelect(file);
        }
    }

    return (
        <div className="flex flex-col">
            <Input 
                type="file" 
                accept={accept ?? ""}
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden"/>
            <Button {...buttonProps} onPress={handleButtonClick}>
                {children ?? "Upload File"}
            </Button>
        </div>
    )
}