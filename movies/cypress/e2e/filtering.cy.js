import { filterByGenreAndTitle } from '../support/e2e';
import { filterByTitle, filterByGenre } from '../support/e2e';

let movies; // List of Discover movies from TMDB


/* The code block is setting up the initial state for the test suite. */
describe("Filtering", () => {
    before(() => {
        // Get movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/");
    });

    describe("By movie title", () => {
        it("only display movies with 'm' in the title", () => {
            const searchString = "m";
            const matchingMovies = filterByTitle(movies, searchString);

            cy.get("#filled-search").clear();

            cy.get("#filled-search").type(searchString); // Enter m in text box

            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );

            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
        });

        it("handles case when there are no matches", () => {
            const searchString = "xyxxzyyzz";

            cy.get("#filled-search").clear();

            cy.get("#filled-search").type(searchString); // Enter m in text box

            cy.get(".MuiCardHeader-content").should("have.length", 0);
        });
    });

    describe("By movie genre", () => {
        it("show movies with the selected genre", () => {
            const selectedGenreId = 35;
            const selectedGenreText = "Comedy";
            const matchingMovies = filterByGenre(movies, selectedGenreId);

            cy.get("#genre-select").click();

            cy.get("li").contains(selectedGenreText).click();

            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );

            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
        });
    });

    describe("Combined genre and title", () => {
        it("shows movies that match both the selected genre and title", () => {
            const searchString = "a"; // Example title search string
            const selectedGenreId = 28; // Example genre ID (e.g., Action)
            const selectedGenreText = "Action"; // The text that represents the genre in the UI
    
            // Filter movies by both genre and title
            const matchingMovies = filterByGenreAndTitle(movies, selectedGenreId, searchString);
    
            // Interact with UI to set filters
            cy.get("#filled-search").clear(); // Clear the search box
            cy.get("#filled-search").type(searchString); // Type the search string
    
            cy.get("#genre-select").click(); // Open genre dropdown
            cy.get("li").contains(selectedGenreText).click(); // Select genre
    
            // Assertions
            cy.get(".MuiCardHeader-content").should("have.length", matchingMovies.length);
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
        });
    });
    
})
    ;