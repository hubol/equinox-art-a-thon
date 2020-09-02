export function insertAtLeastOneOrEveryN<T, U extends T>(array: T[], insert: U, n: number): T[]
{
    let index = 0;

    while (index === 0 || index < array.length)
    {
        array.splice(index, 0, insert);
        index += n + 1;
    }

    return array;
}