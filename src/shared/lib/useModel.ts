import { useState } from "react";

export interface Model<T> {
    get(key: keyof T): T[typeof key];
    set(key: keyof T, value: T[typeof key]): void;
}

export function useModel<T>(): Model<T> {
    const [ data, setData ] = useState<Partial<T>>({});

    const get = (key: keyof T): T[typeof key] => {
        return (data as any)[key];
    };

    const set = (key: keyof T, value: T[typeof key]): void => {
        setData({ ...data, [key]: value })
    }

    return {
        get,
        set
    }
}