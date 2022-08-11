import { NationalDex_ListPokemon } from '../../../ui_elements/pokemon_app/NationalDexPage'
import { Locator, Page } from '@playwright/test'
import { CommonClass } from "../../../common/pokemon_app/CommonUI";

export class NationalDexPageClass 
{
    readonly page: Page

    constructor(page: Page)
    {
        this.page = page
    }

    async doesAPokemonWithThisNameExist(targetName: string): Promise<boolean>
    {
		let exist: boolean = false
        const commonPage = new CommonClass(this.page)
        let allPokemonNames: Locator = await commonPage.waitForElements(this.page, NationalDex_ListPokemon().POKEMON_NAME_LINK, 1000, 5, true)
        let amount: number = await allPokemonNames.count()
        let index: number = 0
        while(index <= amount)
        {
            let pokemonName_label: Locator =  await allPokemonNames.nth(index)
            let name: string = await pokemonName_label.innerText()
            if(name == targetName)
            {
                exist = true
                break
            }
            index = index + 1
        }
		return exist
    }
	
	
	async doesAPokemonWithThisNumberExist(targetNumber: string): Promise<boolean>
    {
		let exist: boolean = false
        const commonPage = new CommonClass(this.page)
        let allPokemonNumbers: Locator = await commonPage.waitForElements(this.page, NationalDex_ListPokemon().POKEMON_NUMBER_LABEL, 1000, 5, true)
        let amount: number = await allPokemonNumbers.count()
        let index: number = 0
        while(index <= amount)
        {
            let pokemonNumber_label: Locator =  await allPokemonNumbers.nth(index)
            let actualNumber: string = await pokemonNumber_label.innerText()
            if(actualNumber == targetNumber)
            {
                exist = true
                break
            }
            index = index + 1
        }
		return exist
    }
	
	
	async returnNameOfPokemonWithThisNumber(targetNumber: string): Promise<string>
	{
		let name: string = null
        const commonPage = new CommonClass(this.page)
		let numberExist: boolean = await this.doesAPokemonWithThisNumberExist(targetNumber)
		if(numberExist)
		{
			let allPokemonNames: Locator = await commonPage.waitForElements(this.page, NationalDex_ListPokemon().POKEMON_NAME_LINK, 1000, 5, true)
			let amount: number = await allPokemonNames.count()
			let index: number = Number(targetNumber) - 1
			let pokemonName_label: Locator =  await allPokemonNames.nth(index)
            name = await pokemonName_label.innerText()
		}
		return name
	}
	
	
	async returnNumberOfPokemonWithThisName(targetName: string): Promise<string>
	{
		let pkNumber: string = "-1"
		let nameExist: boolean = await this.doesAPokemonWithThisNameExist(targetName)
		if(nameExist)
		{
		    const commonPage = new CommonClass(this.page)
			let allPokemonNames: Locator = await commonPage.waitForElements(this.page, NationalDex_ListPokemon().POKEMON_NAME_LINK, 1000, 5, true)
			let amount: number = await allPokemonNames.count()
			let index: number = 0
			while(index <= amount)
			{
				let pokemonName: Locator =  await allPokemonNames.nth(index)
				let name: string = await pokemonName.innerText()
				if(name == targetName)
				{
					var value = index + 1
                    pkNumber = value.toString()
					break
				}
				index = index + 1
			}
		}
		return pkNumber
	}
	
	
	async clickPokemonWithThisName(targetName: string): Promise<void>
	{
		let nameExist: boolean = await this.doesAPokemonWithThisNameExist(targetName)
		if(nameExist)
		{
			let pkNumber: string = await this.returnNumberOfPokemonWithThisName(targetName)
			let targetIndex: number = Number(pkNumber)
		    const commonPage = new CommonClass(this.page)
			let allPokemonNames: Locator = await commonPage.waitForElements(this.page, NationalDex_ListPokemon().POKEMON_NAME_LINK, 1000, 5, true)
			let pokemonName_link: Locator =  await allPokemonNames.nth(targetIndex)
			await pokemonName_link.waitFor({state:"visible", timeout: 7000})
			await pokemonName_link.click()
		}
		else
		{
			console.log("clickPokemonWithThisName() could not find Pokemon named: "+targetName)
		}
	}
}