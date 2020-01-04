const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

module.exports = class Chat extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Returns the current visible (non-expired) chat messages.
     *
     * @param {number} since Only return messages newer than this time (in millis since Jan 1 1970).
     *
     * @returns {chatMessages}
     */
    this.getChatMessages = subsonicMethod({
      method: 'GET',
      path: 'getChatMessages',
      urlParams: ['action'],
      minVersion: '1.2.0',
    });

    /**
     * Adds a message to the chat log.
     *
     * @param {string} message The chat message.
     *
     * @returns {void}
     */
    this.addChatMessage = subsonicMethod({
      method: 'GET',
      path: 'addChatMessage',
      urlParams: ['message'],
      minVersion: '1.2.0',
    });
  }
};
