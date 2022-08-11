import { MainPage_QuickLinks } from '../../../ui_elements/pokemon_app/MainPage'
import { Locator, Page } from '@playwright/test'
import { CommonClass } from "../../../common/pokemon_app/CommonUI";

export class MainPageClass 
{
    readonly page: Page

    constructor(page: Page)
    {
        this.page = page
    }

    async navigateToPokedexFromQuickLinksMenu(): Promise<void>
    {
	    const commonPage = new CommonClass(this.page)
        let nationalDex_link: Locator = await commonPage.waitForElements(this.page, MainPage_QuickLinks().NATIONAL_DEX_LINK, 250, 10, true)
        await nationalDex_link.waitFor({state:"visible", timeout: 7000})
        await nationalDex_link.click()
    }
}