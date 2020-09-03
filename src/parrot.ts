import {default as axios} from "axios";

const url = "https://aeat-chyron.herokuapp.com/";

export async function pushAsync<T>(t: T)
{
    try
    {
        await axios.post(url, t);
    }
    catch (e)
    {
        console.error("Error occurred while pushing", t, url, e);
    }
}

export async function pullAsync<T>(): Promise<T | undefined>
{
    try
    {
        return (await axios.get<T>(url)).data;
    }
    catch (e)
    {
        console.error("Error occurred while pulling", url, e);
    }
}