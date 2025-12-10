"use client";

import { useEffect } from "react";
import { YandexMetrikaInitializer } from "./initializer";
import { usePathname, useSearchParams } from "next/navigation";
import { useYandexMetrika } from "./useYandexMetrika";
import { YANDEX_METRIKA_ENABLED, YANDEX_METRIKA_ID } from "./constants";

export const YandexMetrikaContainer = () => {
    const pathname = usePathname();
    const search = useSearchParams();
    const { hit } = useYandexMetrika(YANDEX_METRIKA_ID);

    useEffect(() => {
        hit(`${pathname}${search.size ? `?${search}` : ""}${window.location.hash}`)
    }, [hit, pathname, search]);

    if (!YANDEX_METRIKA_ENABLED) return null;

    return (
        <YandexMetrikaInitializer
            id={YANDEX_METRIKA_ID}
            parameters={{
                ssr: true,
                webvisor: true,
                clickmap: true,
                accurateTrackBounce: true,
                trackLinks: true,
            }}
        />
    )
}