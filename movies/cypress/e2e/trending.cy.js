let movies; // List of movies from TMDB
let movie; // Movie details for testing

/* The code block is a test suite for the "Trending Movies Page". It uses Cypress, a JavaScript
end-to-end testing framework, to perform tests on the page. */
describe("Trending Movies Page", () => {
  before(() => {
    // Get the trending movies from TMDB and store them locally.
    cy.request(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=1`
    )     

      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results;
      });
  });

  beforeEach(() => {
    cy.visit("/movies/trending"); 
  });




  describe("The Trending Movies page", () => {
    beforeEach(() => {
      cy.visit("/movies/trending");   // CHANGE THIS LINE
    });

  
    /* The code `it("displays the page header", () => {
      cy.get("h3").contains("Trending Movies");
    });` is a test case that checks if the page header on the Trending Movies page contains the text
    "Trending Movies". */
    it("displays the page header", () => {
      cy.get("h3").contains("Trending Movies");
    });
  
    it("displays a list of trending movies", () => {
      cy.get(".MuiCardHeader-root").should("have.length", movies.length);
    }
     );

   /* The code block is a test case that checks if the correct movie titles are displayed on the
   Trending Movies page. */
    it("displays the correct movie titles", () => {
      /* The code `cy.get(".MuiCardHeader-content").each((, index) => {
              cy.wrap().find("p").contains(movies[index].title);
            });` is iterating over each element with the class name ".MuiCardHeader-content" on the
      page. */
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(movies[index].title);
      });
    });

    /* The code block is a test case that checks if the movie poster images are displayed on the
    Trending Movies page. It uses Cypress to select all elements with the class name
    "MuiCardMedia-root" (which represents the movie poster images) and performs the following
    checks: */
    /* 
    I am using cy.get to select all elements with the class .MuiCardMedia-root.
    I am iterating over each selected element and using .invoke('attr', 'style') 
    to get its style attribute.
    I am then making an assertion with .should('include', ...) 
    to ensure that the style attribute contains the string 
    'background-image: url('. This confirms that the CSS for each element sets a background image.
    */
    it("displays movie poster images", () => {
      /* The code block is using Cypress to select all elements with the class name
      ".MuiCardMedia-root" (which represents the movie poster images) and performing the following
      checks: */
      cy.get(".MuiCardMedia-root").each(($div, index) => {
        // Check if the div has a role of 'img'
        cy.wrap($div).should("have.attr", "role", "img");
        // Check if the div has a non-empty background-image style
        cy.wrap($div).invoke('attr', 'style').should('contain', 'background-image');
      });
    });



    
  });




  describe("Trending Movies Pagination", () => {
    beforeEach(() => {
      cy.visit("/movies/trending");
    });
  
    it("should display pagination controls", () => {
      cy.get(".MuiPagination-ul").should("exist");
    });
  
    it("should navigate to a specific page when page number is clicked", () => {
      // Click on the second page number
      cy.get(".MuiPagination-ul li").contains("2").click();
  
      // Verify that new movies are displayed
      cy.get(".MuiCardHeader-root").should("have.length", movies.length);
      // Optionally, check if the second page button is now selected
    });
  
    it("should navigate to the next page when next button is clicked", () => {
      // Click on the 'next page' button
      cy.get(".MuiPagination-ul li button[aria-label='Go to next page']").click();
  
      // Verify that new movies are displayed
      cy.get(".MuiCardHeader-root").should("have.length", movies.length);
    });
  
    // Additional tests for 'previous page', 'first page', 'last page' buttons can be added here
  });









  describe("The Trending Details page", () => {
    before(() => {
      // Fetch details of the first movie for testing
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movies[0].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((movieDetails) => {
          movie = movieDetails;
        });
    });


    beforeEach(() => {
      // Visit the movie details page for the first movie
      cy.visit(`/movies/${movies[0].id}`);
    });

    it("displays the movie title, overview, and genres", () => {
      cy.get("h3").contains(movie.title);
      cy.get("h3").contains("Overview");
      cy.get("h3").next().contains(movie.overview);
      cy.get("p")
        .next()
        .within(() => {
          const genreChips = movie.genres.map((g) => g.name);
          genreChips.unshift("Genres");
          cy.get("span").each(($card, index) => {
            cy.wrap($card).contains(genreChips[index]);
          });
        });
    });
  });
});
