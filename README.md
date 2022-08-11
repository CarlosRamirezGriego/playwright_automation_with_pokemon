# playwright_automation_with_pokemon
Playwright Sample UI/API automation

Install Playwright using NPM: npm init playwright, npm i -D @playwright/test

Leave all the default selections: Typescript
Remove the e2e directory created afterwards

Install Axios library using NPM: npm install axios


All: npx playwright test --headed
With specific tag "smoke": npx playwright test --grep @smoke --headed
With specific configuration: npx playwright test --grep @login --headed --config=tests/web.config.ts