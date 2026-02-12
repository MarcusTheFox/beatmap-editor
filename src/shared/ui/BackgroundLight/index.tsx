import { cn } from "@heroui/theme";

const BACKGROUND_LIGHT_CONFIG = {
    height: {
        md: "h-40",
        lg: "h-80",
    },
    color: {
        warning: "from-warning/10",
        primary: "from-primary/10",
        primary20: "from-primary/20",
    },
    position: {
        top: "top-0 bg-gradient-to-b",
        bottom: "bottom-0 bg-gradient-to-t",
    },
} as const;

export type BackgroundLightType = {
    height?: keyof typeof BACKGROUND_LIGHT_CONFIG.height,
    color?: keyof typeof BACKGROUND_LIGHT_CONFIG.color,
    position?: keyof typeof BACKGROUND_LIGHT_CONFIG.position,
};

export const BackgroundLight = ( props : BackgroundLightType ) => {
    return (
        <div className="relative">
            <div className={ cn(
                "absolute inset-x-0 pointer-events-none",
                BACKGROUND_LIGHT_CONFIG.position[props.position ?? "top"],
                BACKGROUND_LIGHT_CONFIG.color[props.color ?? "warning"],
                "to-transparent",
                BACKGROUND_LIGHT_CONFIG.height[props.height ?? "md"],
            ) }
            />
        </div>
    );
};
