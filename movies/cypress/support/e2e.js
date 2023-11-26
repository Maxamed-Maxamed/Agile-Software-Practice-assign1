// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


/**
 * The function `filterByTitle` filters a given movie list based on a provided string, returning only
 * the movies whose titles contain the string (case-insensitive).
 * @param movieList - An array of movie objects. Each movie object should have a "title" property.
 * @param string - The `string` parameter is a string that represents the title or a part of the title
 * that we want to filter the `movieList` by.
 */
export const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

/**
 * The function `filterByGenre` filters a given movie list based on a specific genre ID.
 * @param movieList - An array of movie objects. Each movie object should have a property called
 * "genre_ids" which is an array of genre IDs that the movie belongs to.
 * @param genreId - The genreId is the unique identifier for a specific genre. It is used to filter the
 * movieList based on the genre.
 */
export const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));


  

  /**
   * The function `filterByGenreAndTitle` filters a movie list by genre and title, returning only the
   * movies that match the specified genre ID and contain the specified string in their title.
   * @param movieList - An array of movie objects. Each movie object should have properties like
   * "title", "genre_ids", etc.
   * @param genreId - The genreId parameter is the ID of the genre that you want to filter the movie
   * list by.
   * @param string - The "string" parameter is a string that represents the title or part of the title
   * of a movie.
   * @returns a filtered movie list based on the genre ID and title string provided.
   */
  export const filterByGenreAndTitle = (movieList, genreId, string) => {
    return movieList
        .filter((m) => m.genre_ids.includes(genreId))
        .filter((m) => m.title.toLowerCase().search(string.toLowerCase()) !== -1);
};