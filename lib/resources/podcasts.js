const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

module.exports = class Podcasts extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Returns all Podcast channels the server subscribes to, and (optionally) their episodes. This method can also be used to return details for only one channel - refer to the id parameter. A typical use case for this method would be to first retrieve all channels without episodes, and then retrieve all episodes for the single channel the user selects.
     *
     * @param {boolean} includeEpisodes (OPTIONAL) (Since 1.9.0) Default `true`. Whether to include Podcast episodes in the returned result.
     * @param {number} id (OPTIONAL) (Since 1.9.0) If specified, only return the Podcast channel with this ID.
     *
     * @returns {podcasts}
     */
    this.getPodcasts = subsonicMethod({
      method: 'GET',
      path: 'getPodcasts',
      minVersion: '1.6.0',
    });

    /**
     * Returns the most recently published Podcast episodes.
     *
     * @param {number} count (OPTIONAL) Default 20. The maximum number of episodes to return.
     *
     * @returns {newestPodcasts}
     */
    this.getNewestPodcasts = subsonicMethod({
      method: 'GET',
      path: 'getNewestPodcasts',
      minVersion: '1.13.0',
    });

    /**
     * Requests the server to check for new Podcast episodes. Note: The user must be authorized for Podcast administration
     *
     * @param {number} count (OPTIONAL) Default 20. The maximum number of episodes to return.
     *
     * @returns {void}
     */
    this.refreshPodcasts = subsonicMethod({
      method: 'GET',
      path: 'refreshPodcasts',
      minVersion: '1.9.0',
    });

    /**
     * Adds a new Podcast channel. Note: The user must be authorized for Podcast administration.
     *
     * @param {string} url The URL of the Podcast to add.
     *
     * @returns {void}
     */
    this.createPodcastChannel = subsonicMethod({
      method: 'GET',
      path: 'createPodcastChannel',
      urlParams: ['url'],
      minVersion: '1.9.0',
    });

    /**
     * Deletes a Podcast channel. Note: The user must be authorized for Podcast administration
     *
     * @param {string} id The ID of the Podcast to delete.
     *
     * @returns {void}
     */
    this.deletePodcastChannel = subsonicMethod({
      method: 'GET',
      path: 'deletePodcastChannel',
      urlParams: ['id'],
      minVersion: '1.9.0',
    });

    /**
     * Deletes a Podcast episode. Note: The user must be authorized for Podcast administration
     *
     * @param {string} id The ID of the Podcast episode to delete.
     *
     * @returns {void}
     */
    this.deletePodcastEpisode = subsonicMethod({
      method: 'GET',
      path: 'deletePodcastEpisode',
      urlParams: ['id'],
      minVersion: '1.9.0',
    });

    /**
     * Request the server to start downloading a given Podcast episode. Note: The user must be authorized for Podcast administration
     *
     * @param {string} id The ID of the Podcast episode to download.
     *
     * @returns {void}
     */
    this.downloadPodcastEpisode = subsonicMethod({
      method: 'GET',
      path: 'downloadPodcastEpisode',
      urlParams: ['id'],
      minVersion: '1.9.0',
    });
  }
};
