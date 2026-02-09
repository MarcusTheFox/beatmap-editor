import { YANDEX_METRIKA_ENABLED } from "./constants";
import { YandexMetrikaHitOptions, YandexMetrikaMethod, YandexMetrikaMethodParams } from "./types";

declare const ym: (
    id: number,
    method: YandexMetrikaMethod,
    ...params: unknown[]
) => void;

export const useYandexMetrika = ( id: number ) => {
    const hit = ( url?: string, options?: YandexMetrikaHitOptions ) => {
        if ( YANDEX_METRIKA_ENABLED ) {
            ym( id, "hit", url, options );
        }
        else {
            console.log( "%c[YandexMetrika](hit)", "color: orange", url );
        }
    };

    const reachGoal = (
        target: string,
        params?: YandexMetrikaMethodParams,
        callback?: () => void,
        ctx?: unknown,
    ) => {
        if ( YANDEX_METRIKA_ENABLED ) {
            ym( id, "reachGoal", target, params, callback, ctx );
        }
        else {
            console.log( "%c[YandexMetrika](reachGoal)", "color: orange", target );
        }
    };

    return {
        hit,
        reachGoal,
    };
};
