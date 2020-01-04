const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

module.exports = class Sharing extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Returns information about shared media this user is allowed to manage. Takes no extra parameters.
     *
     * @returns {shares}
     */
    this.getShares = subsonicMethod({
      method: 'GET',
      path: 'getShares',
      minVersion: '1.6.0',
    });

    /**
     * Creates a public URL that can be used by anyone to stream music or video from the Subsonic server. The URL is short and suitable for posting on Facebook, Twitter etc. Note: The user must be authorized to share.
     *
     * @param {number} id ID of a song, album or video to share. Use one id parameter for each entry to share.
     * @param {string} description (OPTIONAL) A user-defined description that will be displayed to people visiting the shared media.
     * @param {number} expires (OPTIONAL) The time at which the share expires. Given as milliseconds since 1970.
     *
     * @returns {shares}
     */
    this.createShare = subsonicMethod({
      method: 'GET',
      path: 'createShare',
      urlParams: ['id'],
      minVersion: '1.6.0',
    });

    /**
     * Updates the description and/or expiration date for an existing share.
     *
     * @param {number} id ID of the share to update.
     * @param {string} description (OPTIONAL) A user-defined description that will be displayed to people visiting the shared media.
     * @param {number} expires (OPTIONAL) The time at which the share expires. Given as milliseconds since 1970, or zero to remove the expiration.
     * @returns {void}
     */
    this.updateShare = subsonicMethod({
      method: 'GET',
      path: 'updateShare',
      urlParams: ['id'],
      minVersion: '1.6.0',
    });

    /**
     * Deletes an existing share.
     *
     * @param {number} id ID of the share to delete.
     *
     * @returns {void}
     */
    this.deleteShare = subsonicMethod({
      method: 'GET',
      path: 'deleteShare',
      urlParams: ['id'],
      minVersion: '1.6.0',
    });
  }
};
