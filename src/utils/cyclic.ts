export function cyclic(number: number, min: number, max: number)
{
    number = (number-min)%(max-min);
    if (number<0) number+=(max-min);
    return number+min;
}