const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

module.exports = class PlayQueue extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Returns the state of the play queue for this user (as set by savePlayQueue). This includes the tracks in the play queue, the currently playing track, and the position within this track. Typically used to allow a user to move between different clients/apps while retaining the same play queue (for instance when listening to an audio book).
     *
     * @returns {playQueue}
     */
    this.getPlayQueue = subsonicMethod({
      method: 'GET',
      path: 'getPlayQueue',
      minVersion: '1.0.0',
    });

    /**
     * Saves the state of the play queue for this user. This includes the tracks in the play queue, the currently playing track, and the position within this track. Typically used to allow a user to move between different clients/apps while retaining the same play queue (for instance when listening to an audio book).
     *
     * @param {number} id ID of a song in the play queue. Use one id parameter for each song in the play queue.
     * @param {number} current (OPTIONAL) The ID of the current playing song.
     * @param {number} position (OPTIONAL) The position in milliseconds within the currently playing song.
     *
     * @returns {void}
     */
    this.savePlayQueue = subsonicMethod({
      method: 'GET',
      path: 'savePlayQueue',
      urlParams: ['id'],
      minVersion: '1.0.0',
    });
  }
};
