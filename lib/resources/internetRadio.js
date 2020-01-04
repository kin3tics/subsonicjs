const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

module.exports = class InternetRadio extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Returns all internet radio stations. Takes no extra parameters.
     *
     * @returns {internetRadioStations}
     */
    this.getInternetRadioStations = subsonicMethod({
      method: 'GET',
      path: 'getInternetRadioStations',
      minVersion: '1.9.0',
    });

    /**
     * Adds a new internet radio station. Only users with admin privileges are allowed to call this method.
     *
     * @param {string} streamUrl The stream URL for the station.
     * @param {string} name The user-defined name for the station.
     * @param {string} homepageUrl (OPTIONAL) The home page URL for the station.
     *
     * @returns {void}
     */
    this.createInternetRadioStation = subsonicMethod({
      method: 'GET',
      path: 'createInternetRadioStation',
      urlParams: ['streamUrl', 'name'],
      minVersion: '1.16.0',
    });

    /**
     * Updates an existing internet radio station. Only users with admin privileges are allowed to call this method.
     *
     * @param {number} id The ID for the station.
     * @param {string} streamUrl The stream URL for the station.
     * @param {string} name The user-defined name for the station.
     * @param {string} homepageUrl (OPTIONAL) The home page URL for the station.
     *
     * @returns {void}
     */
    this.updateInternetRadioStation = subsonicMethod({
      method: 'GET',
      path: 'updateInternetRadioStation',
      urlParams: ['id', 'streamUrl', 'name'],
      minVersion: '1.16.0',
    });

    /**
     * Deletes an existing internet radio station. Only users with admin privileges are allowed to call this method.
     *
     * @param {string} id The ID for the station.
     *
     * @returns {void}
     */
    this.deleteInternetRadioStation = subsonicMethod({
      method: 'GET',
      path: 'deleteInternetRadioStation',
      urlParams: ['id'],
      minVersion: '1.16.0',
    });
  }
};
