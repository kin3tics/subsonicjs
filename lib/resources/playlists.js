const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

module.exports = class Playlists extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Returns all playlists a user is allowed to play.
     *
     * @param {string} username (OPTIONAL) (Since 1.8.0) If specified, return playlists for this user rather than for the authenticated user. The authenticated user must have admin role if this parameter is used.
     *
     * @returns {playlists}
     */
    this.getPlaylists = subsonicMethod({
      method: 'GET',
      path: 'getPlaylists',
      minVersion: '1.0.0',
    });

    /**
     * Returns a listing of files in a saved playlist.
     *
     * @param {number} id ID of the playlist to return, as obtained by `getPlaylists`.
     *
     * @returns {playlist}
     */
    this.getPlaylist = subsonicMethod({
      method: 'GET',
      path: 'getPlaylist',
      urlParams: ['id'],
      minVersion: '1.0.0',
    });

    /**
     * Creates (or updates) a playlist.
     *
     * @param {number} playlistId (REQUIRED: if updating) The playlist ID.
     * @param {string} name (REQUIRED: if creating) The human-readable name of the playlist.
     * @param {number} songId (OPTIONAL) ID of a song in the playlist. Use one songId parameter for each song in the playlist.
     *
     * @returns {playlist} Since 1.14.0 the newly created/updated playlist is returned. In earlier versions an empty element is returned.
     */
    this.createPlaylist = subsonicMethod({
      method: 'GET',
      path: 'createPlaylist',
      // urlParams: ['playlistId'],
      minVersion: '1.2.0',
    });

    /**
     * Updates a playlist. Only the owner of a playlist is allowed to update it.
     *
     * @param {number} playlistId (REQUIRED) The playlist ID.
     * @param {string} name (OPTIONAL) The human-readable name of the playlist.
     * @param {string} comment (OPTIONAL) The playlist comment.
     * @param {boolean} public (OPTIONAL) `true` if the playlist should be visible to all users, `false` otherwise.
     * @param {number} songIdToAdd (OPTIONAL) Add this song with this ID to the playlist. Multiple parameters allowed.
     * @param {number} songIndexToRemove (OPTIONAL) Remove the song at this position in the playlist. Multiple parameters allowed.
     *
     * @returns {void}
     */
    this.createPlaylist = subsonicMethod({
      method: 'GET',
      path: 'updatePlaylist',
      urlParams: ['playlistId'],
      minVersion: '1.8.0',
    });

    /**
     * Deletes a saved playlist.
     *
     * @param {number} id ID of the playlist to delete, as obtained by `getPlaylists`.
     *
     * @returns {void}
     */
    this.deletePlaylist = subsonicMethod({
      method: 'GET',
      path: 'deletePlaylist',
      urlParams: ['id'],
      minVersion: '1.2.0',
    });
  }
};
