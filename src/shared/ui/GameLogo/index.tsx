import { SVGProps } from "react";

const GameLogoIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  height,
  width,
  ...props
}) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 0h6v6L6 9H0V3zm14 0h-6v6l3 3h6V3zM3 20h6v-6l-3-3H0v6zm14 0h-6v-6l3-3h6v6z"
      fill="currentColor"
    />
  </svg>
);

export const GameLogo = () => {
    return (
        <div className="flex gap-2 items-center">
            <GameLogoIcon height={20} width={20}/>
            <p className="font-bold">Beam & Beat</p>
        </div>
    )
}