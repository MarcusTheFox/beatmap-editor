import { Button, ButtonProps } from "@heroui/button";
import { Input } from "@heroui/input";
import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";

interface UploadButtonProps extends ButtonProps {
  children?: ReactNode;
  accept?: string | undefined;
  onFileSelect?: (file: File) => void;
}

export interface UploadButtonRef {
  clearFile: () => void;
}

export const UploadButton = forwardRef<UploadButtonRef, UploadButtonProps>(
  (props, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { children, accept, onFileSelect, ...buttonProps } = props;

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (onFileSelect && file) {
        onFileSelect(file);
      }
    };

    const clearFile = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        clearFile,
      }),
      [],
    );

    return (
      <div className="flex flex-col">
        <Input
          ref={fileInputRef}
          accept={accept ?? ""}
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />
        <Button {...buttonProps} onPress={handleButtonClick}>
          {children ?? "Upload File"}
        </Button>
      </div>
    );
  },
);
