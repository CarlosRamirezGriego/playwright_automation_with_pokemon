import axios, { AxiosResponse } from 'axios';

export async function pokemon_byName_GET(pokemonName: string): Promise<AxiosResponse>
{
    var eUrl: string = "https://pokeapi.co/"+"api/v2/pokemon/"+pokemonName
    const hHeaders = { 
        "Accept": '*/*'
    };
    return await axios({
        method: "GET",
        url: eUrl,
        headers: hHeaders,
        validateStatus: () => true
    })
}

export async function pokemon_byNumber_GET(pokemonNumber: number): Promise<AxiosResponse>
{
    var eUrl: string = "https://pokeapi.co/"+"api/v2/pokemon/"+pokemonNumber
    const hHeaders = { 
        "Accept": '*/*'
    };
    return await axios({
        method: "GET",
        url: eUrl,
        headers: hHeaders,
        validateStatus: () => true
    })
}



