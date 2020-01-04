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

    /**
     * Returns the current status for media library scanning. Takes no extra parameters.
     *
     * @returns {scanStatus}
     */
    this.getScanStatus = subsonicMethod({
      method: 'GET',
      path: 'getScanStatus',
      minVersion: '1.15.0',
    });

    /**
     * Initiates a rescan of the media libraries. Takes no extra parameters.
     *
     * @returns {scanStatus}
     */
    this.startScan = subsonicMethod({
      method: 'GET',
      path: 'startScan',
      minVersion: '1.15.0',
    });
  }
};
