const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

module.exports = class Users extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Get details about all users, including which authorization roles and folder access they have. Only users with admin privileges are allowed to call this method.
     *
     * @returns {users}
     */
    this.getUsers = subsonicMethod({
      method: 'GET',
      path: 'getUsers',
      minVersion: '1.8.0',
    });

    /**
     * Get details about a given user, including which authorization roles and folder access it has. Can be used to enable/disable certain features in the client, such as jukebox control.
     *
     * @param {string} username The name of the user to retrieve. You can only retrieve your own user unless you have admin privileges.
     *
     * @returns {user}
     */
    this.getUser = subsonicMethod({
      method: 'GET',
      path: 'getUser',
      urlParams: ['username'],
      minVersion: '1.8.0',
    });

    /**
     * Creates a new Subsonic user, using the following parameters:
     *
     * @param {string} username The name of the new user.
     * @param {string} password The password of the new user, either in clear text of hex-encoded (see above).
     * @param {string} email The email address of the new user.
     * @param {boolean} ldapAuthenticated (OPTIONAL) Default `false`. Whether the user is authenicated in LDAP.
     * @param {boolean} adminRole (OPTIONAL) Default `false`. Whether the user is administrator.
     * @param {boolean} settingsRole (OPTIONAL) Default `true`. Whether the user is allowed to change personal settings and password.
     * @param {boolean} streamRole (OPTIONAL) Default `true`. Whether the user is allowed to play files.
     * @param {boolean} jukeboxRole (OPTIONAL) Default `false`. Whether the user is allowed to play files in jukebox mode.
     * @param {boolean} downloadRole (OPTIONAL) Default `false`. Whether the user is allowed to download files.
     * @param {boolean} uploadRole (OPTIONAL) Default `false`. Whether the user is allowed to upload files.
     * @param {boolean} playlistRole (OPTIONAL) Default `false`. Whether the user is allowed to create and delete playlists. Since 1.8.0, changing this role has no effect.
     * @param {boolean} coverArtRole (OPTIONAL) Default `false`. Whether the user is allowed to change cover art and tags.
     * @param {boolean} commentRole (OPTIONAL) Default `false`. Whether the user is allowed to create and edit comments and ratings.
     * @param {boolean} podcastRole (OPTIONAL) Default `false`. Whether the user is allowed to administrate Podcasts.
     * @param {boolean} shareRole (OPTIONAL) Default `false`. (Since 1.8.0) Whether the user is allowed to share files with anyone.
     * @param {boolean} videoConversionRole (OPTIONAL) Default `false`. (Since 1.15.0) Whether the user is allowed to start video conversions.
     * @param {number} musicFolderId (OPTIONAL) Default `All folders`. (Since 1.12.0) IDs of the music folders the user is allowed access to. Include the parameter once for each folder.
     *
     * @returns {void}
     */
    this.createUser = subsonicMethod({
      method: 'GET',
      path: 'createUser',
      urlParams: ['username', 'password', 'email'],
      minVersion: '1.1.0',
    });

    /**
     * Modifies an existing Subsonic user, using the following parameters:
     *
     * @param {string} username The name of the user.
     * @param {string} password (OPTIONAL) The password of the user, either in clear text of hex-encoded (see above).
     * @param {string} email (OPTIONAL) The email address of the user.
     * @param {boolean} ldapAuthenticated (OPTIONAL) Default `false`. Whether the user is authenicated in LDAP.
     * @param {boolean} adminRole (OPTIONAL) Default `false`. Whether the user is administrator.
     * @param {boolean} settingsRole (OPTIONAL) Default `true`. Whether the user is allowed to change personal settings and password.
     * @param {boolean} streamRole (OPTIONAL) Default `true`. Whether the user is allowed to play files.
     * @param {boolean} jukeboxRole (OPTIONAL) Default `false`. Whether the user is allowed to play files in jukebox mode.
     * @param {boolean} downloadRole (OPTIONAL) Default `false`. Whether the user is allowed to download files.
     * @param {boolean} uploadRole (OPTIONAL) Default `false`. Whether the user is allowed to upload files.
     * @param {boolean} playlistRole (OPTIONAL) Default `false`. Whether the user is allowed to create and delete playlists. Since 1.8.0, changing this role has no effect.
     * @param {boolean} coverArtRole (OPTIONAL) Default `false`. Whether the user is allowed to change cover art and tags.
     * @param {boolean} commentRole (OPTIONAL) Default `false`. Whether the user is allowed to create and edit comments and ratings.
     * @param {boolean} podcastRole (OPTIONAL) Default `false`. Whether the user is allowed to administrate Podcasts.
     * @param {boolean} shareRole (OPTIONAL) Default `false`. (Since 1.8.0) Whether the user is allowed to share files with anyone.
     * @param {boolean} videoConversionRole (OPTIONAL) Default `false`. (Since 1.15.0) Whether the user is allowed to start video conversions.
     * @param {number} musicFolderId (OPTIONAL) Default `All folders`. (Since 1.12.0) IDs of the music folders the user is allowed access to. Include the parameter once for each folder.
     * @param {number} maxBitRate (OPTIONAL) (Since 1.13.0) The maximum bit rate (in Kbps) for the user. Audio streams of higher bit rates are automatically downsampled to this bit rate. Legal values: 0 (no limit), 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320.
     *
     * @returns {void}
     */
    this.updateUser = subsonicMethod({
      method: 'GET',
      path: 'updateUser',
      urlParams: ['username'],
      minVersion: '1.1.0',
    });

    /**
     * Deletes an existing Subsonic user, using the following parameters:
     *
     * @param {string} username The name of the user to delete.
     *
     * @returns {void}
     */
    this.deleteUser = subsonicMethod({
      method: 'GET',
      path: 'deleteUser',
      urlParams: ['username'],
      minVersion: '1.3.0',
    });

    /**
     * Changes the password of an existing Subsonic user, using the following parameters. You can only change your own password unless you have admin privileges.
     *
     * @param {string} username The name of the user which should change its password.
     * @param {string} password The new password of the new user, either in clear text of hex-encoded (see above).
     *
     * @returns {void}
     */
    this.changePassword = subsonicMethod({
      method: 'GET',
      path: 'changePassword',
      urlParams: ['username', 'password'],
      minVersion: '1.1.0',
    });
  }
};
