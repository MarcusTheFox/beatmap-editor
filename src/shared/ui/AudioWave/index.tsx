"use client";

import { useState, useEffect } from "react";

export const AudioWave = (props : {
    color?: "yellow" | "blue",
    bottom?: boolean,
    className?: string,
} ) => {
    const gradientDirection = props.bottom ? "bg-gradient-to-b" : "bg-gradient-to-t";
    const color = props.color == "yellow" ? "from-warning" : "from-primary-500";
    const rounded = props.bottom ? "rounded-b" : "rounded-t";
    const itemsDirection = props.bottom ? "items-start" : "items-end";

    const [barCount, setBarCount] = useState(160);
    const [animationDurations, setAnimationDurations] = useState<number[]>([]);

    const calculateBarCount = () => window.innerWidth / 12;

    useEffect(() => {
        const count = calculateBarCount();
        setBarCount(count);
        setAnimationDurations(Array.from({ length: count }, () => Math.random() * 2 + 1));

        const handleResize = () => {
            const newCount = calculateBarCount();
            setBarCount(newCount);
            setAnimationDurations(Array.from({ length: newCount }, () => Math.random() * 2 + 1));
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`absolute flex ${itemsDirection} h-20 w-full gap-1 ${props.className}`}>
            {Array.from({ length: barCount }, (_, i) => (
                <div
                    key={i}
                    className={`flex-1 ${gradientDirection} ${color} ${rounded} animate-height-wave`}
                    style={{
                        height: "60px",
                        transformOrigin: props.bottom ? 'top' : 'bottom',
                        animationDuration: animationDurations[i] ? `${animationDurations[i]}s` : '1.5s',
                    }}
                />
            ))}
        </div>
    );
};