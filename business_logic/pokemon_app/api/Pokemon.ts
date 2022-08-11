import { AxiosResponse } from 'axios';
import { pokemon_byName_GET, pokemon_byNumber_GET  } from '../../../api_clients/pokemon_app/Pokemon';

export class ApiPokemonLogic
{

    constructor() {
    }


    async isThereAPokemonWithThisName(pokemonName: string): Promise<boolean>{
        let response: AxiosResponse = await pokemon_byName_GET(pokemonName.toLocaleLowerCase())
        if(response.status == 200)
        {
            return true
        }
        else
        {

            return false
        }
    }

    async isThereAPokemonWithThisNumber(pokemonNumber: number): Promise<boolean>{
        let response: AxiosResponse = await pokemon_byNumber_GET(pokemonNumber)
        if(response.status == 200)
        {
            return true
        }
        else
        {

            return false
        }
    }

    async returnAllInformationFromPokemonWithThisName(pokemonName: string): Promise<AxiosResponse>{
        let exist: boolean = await this.isThereAPokemonWithThisName(pokemonName.toLocaleLowerCase())
        let response: AxiosResponse = await pokemon_byName_GET(pokemonName.toLocaleLowerCase());
        if(!exist)
        {
            console.log("returnAllInformationFromPokemonWithThisName() didnt return information for Pokemon named: "+pokemonName)
        }
        return response
    }


    async returnAllInformationFromPokemonWithThisNumber(pokemonNumber: number): Promise<AxiosResponse>{
        let exist: boolean = await this.isThereAPokemonWithThisNumber(pokemonNumber)
        let response: AxiosResponse = await pokemon_byNumber_GET(pokemonNumber);
        if(!exist)
        {
            console.log("returnAllInformationFromPokemonWithThisNumber() didnt return information for Pokemon number: "+pokemonNumber)
        }
        return response
    }

    async returnNameOfPokemonWithThisNumber(pokemonNumber: number): Promise<string>{
        let name: string = ""
        let response: AxiosResponse = await this.returnAllInformationFromPokemonWithThisNumber(pokemonNumber);
        if(response.status == 200)
        {
            name = response.data["name"]
        }
        else
        {
            console.log("returnNameOfPokemonWithThisNumber() didnt return information for Pokemon number: "+pokemonNumber)
        }
        return name
    }


    async returnNumberOfPokemonWithThisName(pokemonName: string): Promise<number>{
        let id: number = -1
        let response: AxiosResponse = await this.returnAllInformationFromPokemonWithThisName(pokemonName);
        if(response.status == 200)
        {
            id = response.data["id"]
        }
        else
        {
            console.log("returnNumberOfPokemonWithThisName() didnt return information for Pokemon number: "+pokemonName)
        }
        return id
    }

}