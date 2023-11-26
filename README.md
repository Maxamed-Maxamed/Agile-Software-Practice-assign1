# Agile-Software-Practice-Assignment1

## Name: Maxamed Maxamed

## Overview
This repository contains information about movies hosted by the movie database.

## Features
+ **Feature 1 - Popular Movies:** Showcases a selection of the most popular movies.
+ **Feature 2 - Latest Movies:** Displays the most recent movie releases.
+ **Feature 3 - Trending Movies:** Highlights movies that are currently trending.
+ **Feature 4 - Popular People:** Features well-known individuals in the movie industry.
+ **Feature 5 - Upcoming Movies:** Displays movies that are currently in theaters.
+ **Feature 6 - Favorites:** Displays movies that the user has added to their favorites.
+ **Feature 7 - Movie Details:** Provides details about specific movies.
+ **Feature 8 - Movie Cast:** Displays cast and crew information for specific movies.


## Requirements for Automated Testing
+ Node.js
+ npm
+ Cypress
+ .gitlab-ci.yml


### Best Test Cases
+ cypress/e2e/base.cy.js
+ cypress/e2e/upcoming.cy.js
+ cypress/e2e/trending.cy.js
+ cypress/e2e/popular.cy.js
+ cypress/e2e/latest.cy.js
+ cypress/e2e/navigation.cy.js
+ cypress/e2e/favorites.cy.js
+ cypress/e2e/filtering.cy.js

## Manual Testing
### Requirements for Manual Testing
+ Node.js
+ npm
+ Cypress

### Steps to Run Manual Tests
1. Clone the repository.
2. Open the terminal and navigate to the project directory.
3. Run `npm install` to install all dependencies.
4. Execute `npm run cypress:open` to start the tests.
5. In the Cypress GUI, select and execute any test file.
6. A test is considered failed if an error message is displayed; otherwise, it's passed.
7. For detailed results, check the Cypress dashboard.
8. To run tests in headless mode, use `npm run cypress:run`.
9. After testing, remove the "results" folder created by Cypress in the root directory.

## Known Issues
+ None.
