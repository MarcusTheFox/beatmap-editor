import { BackgroundLight, BackgroundLightType } from "@/src/shared/ui/BackgroundLight"

export interface LayoutWithLightsProps {
    children: React.ReactNode,
    lights?: {
        top?: Omit<BackgroundLightType, "position">,
        bottom?: Omit<BackgroundLightType, "position">
    }
}

export const LayoutWithLights = ({
    children,
    lights = {}
}: LayoutWithLightsProps) => {
    const { top = { color: "warning" }, bottom = { color: "primary" } } = lights;

    return (
        <>
            <BackgroundLight {...top} position="top"/>
            <div className="flex-1 relative z-10">
                {children}
            </div>
            <BackgroundLight {...bottom} position="bottom"/>
        </>
    )
}