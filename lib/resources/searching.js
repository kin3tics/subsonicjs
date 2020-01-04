const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

module.exports = class Searching extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * DEPRECATED - Use `search2()`
     */
    this.search = function() {
      throw new Error('DEPRECATED. Use `search2`.');
    };

    /**
     * Returns albums, artists and songs matching the given search criteria. Supports paging through the result.
     *
     * @param {string} query Search query.
     * @param {number} artistCount (OPTIONAL) Default 20. Maximum number of artists to return.
     * @param {number} artistOffset (OPTIONAL) Default 0. Search result offset for artists. Used for paging.
     * @param {number} albumCount (OPTIONAL) Default 20. Maximum number of albums to return.
     * @param {number} albumOffset (OPTIONAL) Default 0. Search result offset for albums. Used for paging.
     * @param {number} songCount (OPTIONAL) Default 20. Maximum number of songs to return.
     * @param {number} songOffset (OPTIONAL) Default 0. Search result offset for songs. Used for paging.
     * @param {number} musicFolderId (OPTIONAL) (Since 1.12.0) Only return results from the music folder with the given ID. See getMusicFolders.
     *
     * @returns {searchResult2}
     */
    this.search2 = subsonicMethod({
      method: 'GET',
      path: 'search2',
      urlParams: ['query'],
      minVersion: '1.4.0',
    });

    /**
     * Returns albums, artists and songs matching the given search criteria. Supports paging through the result.
     *
     * @param {string} query Search query.
     * @param {number} artistCount (OPTIONAL) Default 20. Maximum number of artists to return.
     * @param {number} artistOffset (OPTIONAL) Default 0. Search result offset for artists. Used for paging.
     * @param {number} albumCount (OPTIONAL) Default 20. Maximum number of albums to return.
     * @param {number} albumOffset (OPTIONAL) Default 0. Search result offset for albums. Used for paging.
     * @param {number} songCount (OPTIONAL) Default 20. Maximum number of songs to return.
     * @param {number} songOffset (OPTIONAL) Default 0. Search result offset for songs. Used for paging.
     * @param {number} musicFolderId (OPTIONAL) (Since 1.12.0) Only return results from the music folder with the given ID. See getMusicFolders.
     *
     * @returns {searchResult3}
     */
    this.search3 = subsonicMethod({
      method: 'GET',
      path: 'search3',
      urlParams: ['query'],
      minVersion: '1.8.0',
    });
  }
};
