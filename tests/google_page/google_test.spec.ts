import { test, expect } from '@playwright/test';
import {GooglePageObject} from '../../ui_elements/GooglePageObject'

test(`Add Pet`, async({page}) => {
    GooglePageObject.initialize(page);
    await GooglePageObject.loadPage()
    await GooglePageObject.searchTerm("Bulbapedia");
    await GooglePageObject.selectSearchSuggestion(0);
    await GooglePageObject.loadSearchResults(0);
    expect(await page.title()).toEqual("Bulbapedia, the community-driven Pokémon encyclopedia");
  })