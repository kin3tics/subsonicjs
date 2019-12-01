const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

/**
 * @typedef license
 * @property {boolean} valid
 * @property {string} email
 * @property {date} licenseExpires
 */

module.exports = class System extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Used to test connectivity with the server. Takes no extra parameters.
     * Returns an empty `<subsonic-response>` element on success.
     *
     * @returns {SubsonicResponse}
     */
    this.ping = subsonicMethod({
      method: 'GET',
      path: 'ping',
      minVersion: '1.0.0',
    });

    /**
     * Get details about the software license. Takes no extra parameters.
     * Please note that access to the REST API requires that the server has a valid license (after a 30-day trial period). To get a license key you must upgrade to Subsonic Premium.
     *
     * @returns {license}
     */
    this.getLicense = subsonicMethod({
      method: 'GET',
      path: 'getLicense',
      minVersion: '1.0.0',
    });
  }
};
