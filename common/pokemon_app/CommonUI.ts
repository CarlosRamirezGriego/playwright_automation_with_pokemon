import { Locator, Page } from "@playwright/test";

export class CommonClass {
    private page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }
  
    async updatePage(newPage: Page): Promise<void>
    {
        this.page = newPage
    }
  
    async navigateToHomepage() {
      let rootURL = "https://pokemondb.net/"
      await this.page.goto(rootURL)
      await this.page.waitForURL(rootURL)
    }
  
    async refreshPage() {
      await this.page.reload();
    }
  
  
    async sleep(msec) {
      return new Promise((resolve) => setTimeout(resolve, msec));
    }
  
  
    async waitForElements(testPage: Page, element: string, interval: number, times: number, elementsExpected: boolean): Promise<Locator> 
    {
      let cycles: number = 0;
      var lessonElement: Locator = testPage.locator(element);
      if (elementsExpected)
      {
        while (cycles < times) 
        {
          if ((await lessonElement.count()) > 0) 
          {
              break //We stop the loop when elements are found
          } 
          else 
          {
            await this.sleep(interval);
            lessonElement = testPage.locator(element);
            cycles = cycles + 1;
          }
        }
      } 
      else 
      {
        while (cycles < times) 
        {
          if ((await lessonElement.count()) > 0) 
          {
            await this.sleep(interval);
            lessonElement = testPage.locator(element);
            cycles = cycles + 1;
          } 
          else 
          {
            break //We stop the loop when NO elements are found
          }
        }
      }
      return lessonElement;
    }
  
  }