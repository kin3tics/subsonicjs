Subsonic.DEFAULT_PROTOCOL = 'http';
Subsonic.DEFAULT_HOST = '';
Subsonic.DEFAULT_PORT = '80';
Subsonic.DEFAULT_TIMEOUT = 30;
Subsonic.DEFAULT_CLIENT = 'subsonicjs';
Subsonic.DEFAULT_FORMAT = 'json';
Subsonic.DEFAULT_VERSION = '1.16.1';
Subsonic.DEFAULT_HEADERS = {
  // 'Content-Type': 'application/json; charset=utf-8',
  // 'Accept-Encoding': 'gzip, deflate',
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers':
  //   'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
  // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

var resources = {
  Bookmarks: require('./resources/bookmarks'),
  Browsing: require('./resources/browsing'),
  Chat: require('./resources/chat'),
  InternetRadio: require('./resources/internetRadio'),
  Jukebox: require('./resources/jukebox'),
  Media: require('./resources/media'),
  Playlists: require('./resources/playlists'),
  PlayQueue: require('./resources/playQueue'),
  Podcasts: require('./resources/podcasts'),
  Searching: require('./resources/searching'),
  Sharing: require('./resources/sharing'),
  System: require('./resources/system'),
  User: require('./resources/user'),
};

Subsonic.resources = resources;

/**
 * @typedef ServerArgs
 * @property {string} protocol ['http'|'https']
 * @property {string} host e.g. www.subsonic.org
 * @property {number} port Default: 80
 * @property {number} timeout Request timeout in seconds
 * @property {string} client A unique string identifying the client application
 * @property {string} format ['xml'|'json']
 * @property {string} version e.g. '1.16.1'
 */
const validServerArgs = [
  'protocol',
  'host',
  'port',
  'timeout',
  'client',
  'format',
  'version',
];

Subsonic.SubsonicResource = require('./subsonicResource');

/**
 * A wrapper to the Subsonic API to make server requests easy
 * @param {string} username username
 * @param {string} token md5 encrypted token of password w/ salt (e.g. md5('sesame' + 'c19b2d'))
 * @param {string} salt random string must be at least 6 characters (e.g. 'c19b2d')
 * @param {string|ServerArgs} config ServerArgs object or url string
 */
function Subsonic(username, token, salt, config, password) {
  if (!(this instanceof Subsonic)) {
    return new Subsonic(...arguments);
  }

  const args = this._getPropsFromConfig(config);

  this._subsonic = {
    protocol: Subsonic.DEFAULT_PROTOCOL,
    host: Subsonic.DEFAULT_HOST,
    port: Subsonic.DEFAULT_PORT,
    timeout: Subsonic.DEFAULT_TIMEOUT,
    client: Subsonic.DEFAULT_CLIENT,
    version: Subsonic.DEFAULT_VERSION,
    format: Subsonic.DEFAULT_FORMAT,
    headers: Subsonic.DEFAULT_HEADERS,
    maxNetworkRetries: 0,
    username: username,
    token: token,
    salt: salt,
    password: password,
  };

  this._prepResources();
  if (args.protocol) {
    this._setApiField('protocol', args.protocol);
  }
  if (args.host) {
    this._setApiField('host', args.host);
  }
  if (args.port) {
    this._setApiField('port', args.port);
  }
  if (args.timeout) {
    this._setApiField('timeout', args.timeout);
  }
  if (args.client) {
    this._setApiField('client', args.client);
  }
  if (args.version) {
    this._setApiField('version', args.version);
  }
  if (args.format) {
    this._setApiField('format', args.format);
  }
  if (args.headers) {
    this._setApiField('headers', args.headers);
  }

  // this.errors = require('./Error');
}

Subsonic.prototype = {
  _setApiField: function(key, value) {
    this._subsonic[key] = value;
  },
  _getApiField: function(key) {
    return this._subsonic[key];
  },
  _prepResources: function() {
    for (var name in resources) {
      this[name.toLowerCase()] = new resources[name](this);
    }
  },
  _getPropsFromConfig(config) {
    // config can be an object or a string
    const isString = typeof config === 'string';
    const isObject = config === Object(config) && !Array.isArray(config);
    if (!isString && !isObject) {
      throw new Error('Host config must either be an object or a string');
    }

    if (isString) {
      return {
        host: config,
      };
    }

    const values = Object.keys(config).filter(
      (value) => !validServerArgs.includes(value)
    );

    if (values.length > 0) {
      throw new Error(
        `Host config object may only contain the following: ${validServerArgs.join(
          ', '
        )}`
      );
    }

    return config;
  },
};

module.exports = Subsonic;
