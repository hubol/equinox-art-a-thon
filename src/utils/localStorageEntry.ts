export function localStorageEntry<T>(key: string)
{
    return {
        read(): T | undefined
        {
            const item = window.localStorage.getItem(key);
            if (item)
                return JSON.parse(item) as T;
            return undefined;
        },
        write(t: T)
        {
            window.localStorage.setItem(key, JSON.stringify(t));
        }
    }
}