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
        while(index <= amount-1)
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
	
	
	async doesAPokemonWithThisNumberExist(targetNumber: number): Promise<boolean>
    {
		let exist: boolean = false
		let targetNumberString: string = "#"+ await this.formatNumber(targetNumber)
        const commonPage = new CommonClass(this.page)
        let allPokemonNumbers: Locator = await commonPage.waitForElements(this.page, NationalDex_ListPokemon().POKEMON_NUMBER_LABEL, 1000, 5, true)
        let amount: number = await allPokemonNumbers.count()
        let index: number = 0
        while(index <= amount-1)
        {
            let pokemonNumber_label: Locator =  await allPokemonNumbers.nth(index)
            let actualNumber: string = await pokemonNumber_label.innerText()
            if(actualNumber == targetNumberString)
            {
                exist = true
                break
            }
            index = index + 1
        }
		return exist
    }
	
	
	async returnNameOfPokemonWithThisNumber(targetNumber: number): Promise<string>
	{
		let name: string = ""
        const commonPage = new CommonClass(this.page)
		let numberExist: boolean = await this.doesAPokemonWithThisNumberExist(targetNumber)
		if(numberExist)
		{
			let allPokemonNames: Locator = await commonPage.waitForElements(this.page, NationalDex_ListPokemon().POKEMON_NAME_LINK, 1000, 5, true)
			let index: number = Number(targetNumber) - 1
			let pokemonName_label: Locator =  await allPokemonNames.nth(index)
            name = await pokemonName_label.innerText()
		}
		else
		{
			console.log("returnNameOfPokemonWithThisNumber() could not find Name of Pokemon with Number: "+targetNumber)
		}
		return name
	}
	
	
	async returnNumberOfPokemonWithThisName(targetName: string): Promise<number>
	{
		let pkNumber: number = -1
		let nameExist: boolean = await this.doesAPokemonWithThisNameExist(targetName)
		if(nameExist)
		{
		    const commonPage = new CommonClass(this.page)
			let allPokemonNames: Locator = await commonPage.waitForElements(this.page, NationalDex_ListPokemon().POKEMON_NAME_LINK, 1000, 5, true)
			let amount: number = await allPokemonNames.count()
			let index: number = 0
			while(index <= amount-1)
			{
				let pokemonName: Locator =  await allPokemonNames.nth(index)
				let name: string = await pokemonName.innerText()
				if(name == targetName)
				{
					var value = index + 1
                    pkNumber = value
					break
				}
				index = index + 1
			}
		}
		else
		{
			console.log("returnNumberOfPokemonWithThisName() could not find Number of Pokemon with Name: "+targetName)
		}
		return pkNumber
	}
	
	
	async clickPokemonWithThisName(targetName: string): Promise<void>
	{
		let nameExist: boolean = await this.doesAPokemonWithThisNameExist(targetName)
		if(nameExist)
		{
			let pkNumber: number = await this.returnNumberOfPokemonWithThisName(targetName)
		    const commonPage = new CommonClass(this.page)
			let allPokemonNames: Locator = await commonPage.waitForElements(this.page, NationalDex_ListPokemon().POKEMON_NAME_LINK, 1000, 5, true)
			let pokemonName_link: Locator =  await allPokemonNames.nth(pkNumber-1)
			await pokemonName_link.waitFor({state:"visible", timeout: 7000})
			await pokemonName_link.click()
		}
		else
		{
			console.log("clickPokemonWithThisName() could not find Pokemon named: "+targetName)
		}
	}

	async formatNumber(targetNumber: number): Promise<string>
	{
		let stringNumber: string = ""
		if(targetNumber > 1 && targetNumber <= 9)
		{
			stringNumber = "00"+targetNumber.toString()
		}
		else if(targetNumber > 10 && targetNumber <= 99)
		{
			stringNumber = "0"+targetNumber.toString()
		}
		else if(targetNumber > 99)
		{
			stringNumber = targetNumber.toString()
		}
		return stringNumber
	}
}