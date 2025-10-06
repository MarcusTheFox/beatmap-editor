import { HTMLHeroUIProps } from "@heroui/system";

export function Label(props : HTMLHeroUIProps<"div">) {
    return (
        <div
            {...props}
            className={`bg-default-100 transition-background rounded-xl h-10 content-center px-3 ${props.className}`}
        >
            { props.children }
        </div>
    )
}