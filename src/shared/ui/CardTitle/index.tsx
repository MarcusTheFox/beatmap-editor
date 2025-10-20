import { ReactNode } from "react";

interface CardTitleProps {
  children: ReactNode;
  className?: string | undefined;
}

export const CardTitle = (props: CardTitleProps) => {
  return (
    <h2 className={`text-lg font-bold ${props.className || ""}`}>
      {props.children}
    </h2>
  );
}
