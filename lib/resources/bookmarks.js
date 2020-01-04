const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

module.exports = class Bookmarks extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Returns all bookmarks for this user. A bookmark is a position within a certain media file.
     *
     * @returns {bookmarks}
     */
    this.getBookmarks = subsonicMethod({
      method: 'GET',
      path: 'getBookmarks',
      minVersion: '1.9.0',
    });

    /**
     * Creates or updates a bookmark (a position within a media file). Bookmarks are personal and not visible to other users.
     *
     * @param {number} id ID of the media file to bookmark. If a bookmark already exists for this file it will be overwritten.
     * @param {number} position The position (in milliseconds) within the media file.
     * @param {string} comment (OPTIONAL) A user-defined comment.
     *
     * @returns {void}
     */
    this.createBookmark = subsonicMethod({
      method: 'GET',
      path: 'createBookmark',
      urlParams: ['id', 'position'],
      minVersion: '1.9.0',
    });

    /**
     * Deletes an existing internet radio station. Only users with admin privileges are allowed to call this method.
     *
     * @param {string} id ID of the media file for which to delete the bookmark. Other users' bookmarks are not affected.
     *
     * @returns {void}
     */
    this.deleteBookmark = subsonicMethod({
      method: 'GET',
      path: 'deleteBookmark',
      urlParams: ['id'],
      minVersion: '1.9.0',
    });
  }
};
