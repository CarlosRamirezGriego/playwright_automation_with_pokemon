import { Locator, Page } from '@playwright/test'

export class GooglePageObject
{
    static page: Page;


    static initialize(page: Page)
    {
        this.page = page;
    }

    static readonly URL: string = "https://www.google.com/"
    static readonly SEARCH_BOX_LOCATOR: string = "textarea[name='q']"
    static readonly SEARCH_BUTTON_LOCATOR: string = "input[value='Google Search']"
    static readonly PREDICTION_LOCATOR: string = "*[role='listbox']  li[data-attrid='AutocompletePrediction']"
    static readonly RESULTS_MAIN_LINK_LOCATOR: string = "div[data-iatvcap] + div span>a h3"

    static async loadPage(): Promise<void>
    {
        await this.page.goto(GooglePageObject.URL, { waitUntil: 'networkidle' });
        await this.page.waitForLoadState('domcontentloaded');
    }


    static async searchTerm(term: string): Promise<void>
    {   
        await this.page.waitForSelector(GooglePageObject.SEARCH_BOX_LOCATOR);
        let search: Locator = await this.page.locator(GooglePageObject.SEARCH_BOX_LOCATOR)
        await search.fill(term)
    }


    static async confirmSearch(term: string): Promise<void>
    {   
        await this.page.waitForSelector(GooglePageObject.SEARCH_BUTTON_LOCATOR);
        let button: Locator = await this.page.locator(GooglePageObject.SEARCH_BUTTON_LOCATOR).nth(1);
        await button.click({force: true})
    }


    static async selectSearchSuggestion(i: number): Promise<void>
    {   
        await this.page.waitForSelector(GooglePageObject.PREDICTION_LOCATOR);
        await this.page.locator(GooglePageObject.PREDICTION_LOCATOR).nth(i).click();

        //We add this because there is a redirectino on click
        await this.page.waitForLoadState('domcontentloaded');
    }


    static async loadSearchResults(i: number): Promise<void>
    {   
        await this.page.waitForSelector(GooglePageObject.RESULTS_MAIN_LINK_LOCATOR);
        let link: Locator = this.page.locator(GooglePageObject.RESULTS_MAIN_LINK_LOCATOR).nth(i);
        await link.click();

        //We add this because there is a redirectino on click
        await this.page.waitForLoadState('domcontentloaded');
    }


}