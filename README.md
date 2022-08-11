# playwright_automation_with_pokemon

Playwright Sample UI/API automation

Explanation Document: https://docs.google.com/document/d/12ToomW2OPLjmDty19KAyOUAWpzey3XQ2fxZJDAxuAN4/edit?usp=sharing

Install Playwright using NPM: npm init playwright, npm i -D @playwright/test

Leave all the default selections: Typescript

Remove the e2e directory created afterwards

Install Axios library using NPM: npm install axios


All: npx playwright test --headed

With specific tag "test001": npx playwright test --grep test001 --headed

With specific configuration and tag "test001": npx playwright test --grep test001 --headed --config=tests/web.config.ts
