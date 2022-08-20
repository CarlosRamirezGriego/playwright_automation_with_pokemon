import { test, expect } from '@playwright/test';
import { MainPageClass } from "../../business_logic/pokemon_app/ui/MainPage";
import { NationalDexPageClass } from "../../business_logic/pokemon_app/ui/NationalDexPage";
import { ApiPokemonLogic } from "../../business_logic/pokemon_app/api/Pokemon"
import { CommonClass } from "../../common/pokemon_app/CommonUI";
import { AxiosResponse } from 'axios';


test('Load a Pokemon Detail Page @e2e  @test001', async ({ page }) => {
  //Required Classes initialization
  const mainPage = new MainPageClass(page)
  const natPage = new NationalDexPageClass(page)
  const commonPage = new CommonClass(page)

  await commonPage.navigateToHomepage()
  await mainPage.navigateToPokedexFromQuickLinksMenu()
  console.log(await natPage.returnNameOfPokemonWithThisNumber(25))
  console.log(await natPage.returnNumberOfPokemonWithThisName("Pikachu"))
  await natPage.clickPokemonWithThisName("Pikachu")
  await commonPage.sleep(5000)

});


test('API Should return a 404 code for non existin Pokemon  @e2e  @test002', async ({ }) => {
  //Required Classes initialization
  const pkAPILogic = new ApiPokemonLogic()

  let numExist: boolean = await pkAPILogic.isThereAPokemonWithThisNumber(25)
  let nmExist: boolean = await pkAPILogic.isThereAPokemonWithThisName("Pikachu")
  let byNumber: AxiosResponse = await pkAPILogic.returnAllInformationFromPokemonWithThisNumber(25)
  let byName: AxiosResponse = await pkAPILogic.returnAllInformationFromPokemonWithThisName("Pikachu")
  let pkName: string = await pkAPILogic.returnNameOfPokemonWithThisNumber(25)
  let pkNumber: number = await pkAPILogic.returnNumberOfPokemonWithThisName("Pikachu")
  expect(pkName).toEqual("pikachu")
  expect(pkNumber).toEqual(25)
  expect(nmExist).toEqual(true)
  expect(numExist).toEqual(true)
  expect(byNumber.status).toEqual(200)
  expect(byName.status).toEqual(200)

});
