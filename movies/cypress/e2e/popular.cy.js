let movies; // List of movies from TMDB
let movie; // Movie details for testing
describe("Popular Movies Page", () => {
  
    before(() => {
      // Get the popular movies from TMDB and store them locally.
      cy.request(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&page=1`
      )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results;
      });
    });
  
    beforeEach(() => {
      cy.visit("/movies/popular"); // Navigate to the popular movies page
    });
  
    describe("The Popular Movies page", () => {
      beforeEach(() => {
        cy.visit("/movies/popular"); // Navigate to the popular movies page
      });
  
      it("displays the page header", () => {
        cy.get("h3").contains("Popular Movies"); // Check for "Popular Movies" header
      });
  
      it("displays a list of popular movies", () => {
        cy.get(".MuiCardHeader-root").should("have.length", movies.length);
      });
  
      it("displays the correct movie titles", () => {
        cy.get(".MuiCardHeader-content").each(($card, index) => {
          cy.wrap($card).find("p").contains(movies[index].title);
        });
      });
  
      it("displays movie poster images", () => {
        cy.get(".MuiCardMedia-root").each(($div, index) => {
          cy.wrap($div).should("have.attr", "role", "img");
          cy.wrap($div).invoke('attr', 'style').should('contain', 'background-image');
        });
      });
    });
  
    describe("Popular Movies Pagination", () => {
      beforeEach(() => {
        cy.visit("/movies/popular");
      });
  
      it("should display pagination controls", () => {
        cy.get(".MuiPagination-ul").should("exist");
      });
  
      it("should navigate to a specific page when page number is clicked", () => {
        cy.get(".MuiPagination-ul li").contains("2").click();
        cy.get(".MuiCardHeader-root").should("have.length", movies.length);
      });
  
      it("should navigate to the next page when next button is clicked", () => {
        cy.get(".MuiPagination-ul li button[aria-label='Go to next page']").click();
        cy.get(".MuiCardHeader-root").should("have.length", movies.length);
      });
    });
  
    describe("The Popular Movie Details page", () => {
      before(() => {
        cy.request(
          `https://api.themoviedb.org/3/movie/${movies[0].id}?api_key=${Cypress.env("TMDB_KEY")}`
        )
        .its("body")
        .then((movieDetails) => {
          movie = movieDetails;
        });
      });
  
      beforeEach(() => {
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
            cy.get("span").each(($chip, index) => {
              cy.wrap($chip).contains(genreChips[index]);
            });
          });
      });
    });
  });
  