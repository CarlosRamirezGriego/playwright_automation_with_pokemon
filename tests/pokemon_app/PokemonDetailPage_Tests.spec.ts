import { test, expect } from '@playwright/test';
import { MainPageClass } from "../../business_logic/pokemon_app/ui/MainPage";
import { NationalDexPageClass } from "../../business_logic/pokemon_app/ui/NationalDexPage";
import { CommonClass } from "../../common/pokemon_app/CommonUI";


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
