describe("Latest Movie Page", () => {
 

    before(() => {
      // Get the latest movie from TMDB and store it locally.
      cy.request(
        `https://api.themoviedb.org/3/movie/latest?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US`
      )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
      
      });
    });
  
    beforeEach(() => {
      cy.visit("/movie/latest"); // Navigate to the latest movie page
    });
  
    describe("The Latest Movie page", () => {
     
  
      it("displays the movie poster image", () => {
        cy.get(".MuiCardMedia-root")
          .should("have.attr", "role", "img")
          .invoke('attr', 'style')
          .should('contain', 'background-image');
      });
  
      // Additional tests specific to the latest movie can be added here
    });
  });