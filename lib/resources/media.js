const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');
const {CONTENT_TYPES} = require('../constants');

module.exports = class Media extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * Streams a given media file.
     *
     * @param {number} id A string which uniquely identifies the file to stream. Obtained by calls to getMusicDirectory.
     * @param {number} maxBitRate (OPTIONAL) (Since 1.2.0) If specified, the server will attempt to limit the bitrate to this value, in kilobits per second. If set to zero, no limit is imposed.
     * @param {string} format (OPTIONAL) (Since 1.6.0) Specifies the preferred target format (e.g., "mp3" or "flv") in case there are multiple applicable transcodings. Starting with 1.9.0 you can use the special value "raw" to disable transcoding.
     * @param {number} timeOffset (OPTIONAL) Only applicable to video streaming. If specified, start streaming at the given offset (in seconds) into the video. Typically used to implement video skipping.
     * @param {number} size (OPTIONAL) (Since 1.6.0) Only applicable to video streaming. Requested video size specified as WxH, for instance "640x480".
     * @param {boolean} estimateContentLength (OPTIONAL) (Since 1.8.0) Default `false`. If set to "true", the Content-Length HTTP header will be set to an estimated value for transcoded or downsampled media.
     * @param {boolean} converted (OPTIONAL) (Since 1.14.0) Default `false`. Only applicable to video streaming. Subsonic can optimize videos for streaming by converting them to MP4. If a conversion exists for the video in question, then setting this parameter to "true" will cause the converted video to be returned instead of the original.
     *
     * @returns {ArrayBuffer} Returns binary data on success, or an XML document on error (in which case the HTTP content type will start with "text/xml")
     */
    this.stream = subsonicMethod({
      method: 'GET',
      path: 'stream',
      urlParams: ['id'],
      minVersion: '1.0.0',
      contentType: CONTENT_TYPES.URI,
    });

    /**
     * Creates an HLS (HTTP Live Streaming) playlist used for streaming video or audio. HLS is a streaming protocol implemented by Apple and works by breaking the overall stream into a sequence of small HTTP-based file downloads. It's supported by iOS and newer versions of Android. This method also supports adaptive bitrate streaming, see the bitRate parameter.
     *
     * @param {number} id A string which uniquely identifies the media file to stream.
     * @param {number} bitRate (OPTIONAL) If specified, the server will attempt to limit the bitrate to this value, in kilobits per second. If this parameter is specified more than once, the server will create a variant playlist, suitable for adaptive bitrate streaming. The playlist will support streaming at all the specified bitrates. The server will automatically choose video dimensions that are suitable for the given bitrates. Since 1.9.0 you may explicitly request a certain width (480) and height (360) like so: bitRate=1000@480x360
     * @param {number} audioTrack (OPTIONAL) The ID of the audio track to use. See getVideoInfo for how to get the list of available audio tracks for a video.
     *
     * @returns {ArrayBuffer} Returns an M3U8 playlist on success (content type "application/vnd.apple.mpegurl"), or an XML document on error (in which case the HTTP content type will start with "text/xml").
     */
    this.download = subsonicMethod({
      method: 'GET',
      path: 'hls.m3u8',
      urlParams: ['id'],
      minVersion: '1.0.0',
    });

    /**
     * Returns captions (subtitles) for a video. Use getVideoInfo to get a list of available captions.
     *
     * @param {number} id The ID of the video.
     * @param {string} format (OPTIONAL) Preferred captions format ("srt" or "vtt").
     *
     * @returns {ArrayBuffer} Returns the raw video captions.
     */
    this.getCaptions = subsonicMethod({
      method: 'GET',
      path: 'getCaptions',
      urlParams: ['id'],
      minVersion: '1.14.0',
    });

    /**
     * Returns a cover art image.
     *
     * @param {number} id The ID of a song, album or artist.
     * @param {number} size (OPTIONAL) If specified, scale image to this size.
     *
     * @returns {ArrayBuffer} Returns the cover art image in binary form.
     */
    this.getCoverArt = subsonicMethod({
      method: 'GET',
      path: 'getCoverArt',
      urlParams: ['id'],
      minVersion: '1.0.0',
      contentType: CONTENT_TYPES.URI,
    });

    /**
     * Searches for and returns lyrics for a given song.
     *
     * @param {string} artist (OPTIONAL) The artist name.
     * @param {string} title (OPTIONAL) The song title.
     *
     * @returns {lyrics}
     */
    this.getLyrics = subsonicMethod({
      method: 'GET',
      path: 'getLyrics',
      minVersion: '1.2.0',
    });

    /**
     * Returns the avatar (personal image) for a user.
     *
     * @param {string} username The user in question.
     *
     * @returns {ArrayBuffer} Returns the avatar image in binary form.
     */
    this.getAvatar = subsonicMethod({
      method: 'GET',
      path: 'getAvatar',
      urlParams: ['username'],
      minVersion: '1.8.0',
    });

    /**
     * Attaches a star to a song, album or artist.
     *
     * @param {number} id (OPTIONAL) The ID of the file (song) or folder (album/artist) to star. Multiple parameters allowed.
     * @param {number} albumId (OPTIONAL) The ID of an album to star. Use this rather than id if the client accesses the media collection according to ID3 tags rather than file structure. Multiple parameters allowed.
     * @param {number} artistId (OPTIONAL) The ID of an artist to star. Use this rather than id if the client accesses the media collection according to ID3 tags rather than file structure. Multiple parameters allowed.
     *
     * @returns {void}
     */
    this.star = subsonicMethod({
      method: 'GET',
      path: 'star',
      minVersion: '1.8.0',
    });

    /**
     * Removes the star from a song, album or artist.
     *
     * @param {number} id (OPTIONAL) The ID of the file (song) or folder (album/artist) to star. Multiple parameters allowed.
     * @param {number} albumId (OPTIONAL) The ID of an album to star. Use this rather than id if the client accesses the media collection according to ID3 tags rather than file structure. Multiple parameters allowed.
     * @param {number} artistId (OPTIONAL) The ID of an artist to star. Use this rather than id if the client accesses the media collection according to ID3 tags rather than file structure. Multiple parameters allowed.
     *
     * @returns {void}
     */
    this.unstar = subsonicMethod({
      method: 'GET',
      path: 'unstar',
      minVersion: '1.8.0',
    });

    /**
     * Sets the rating for a music file.
     *
     * @param {string} id A string which uniquely identifies the file (song) or folder (album/artist) to rate.
     * @param {number} rating The rating between 1 and 5 (inclusive), or 0 to remove the rating.
     *
     * @returns {void}
     */
    this.setRating = subsonicMethod({
      method: 'GET',
      path: 'setRating',
      urlParams: ['id', 'rating'],
      minVersion: '1.6.0',
    });

    /**
     * Registers the local playback of one or more media files. Typically used when playing media that is cached on the client. This operation includes the following:
     *
     * "Scrobbles" the media files on last.fm if the user has configured his/her last.fm credentials on the Subsonic server (Settings > Personal).
     * Updates the play count and last played timestamp for the media files. (Since 1.11.0)
     * Makes the media files appear in the "Now playing" page in the web app, and appear in the list of songs returned by getNowPlaying (Since 1.11.0)
     * Since 1.8.0 you may specify multiple id (and optionally time) parameters to scrobble multiple files.
     *
     * @param {string} id A string which uniquely identifies the file to scrobble.
     * @param {number} time (OPTIONAL) (Since 1.8.0) The time (in milliseconds since 1 Jan 1970) at which the song was listened to.
     * @param {boolean} submission (OPTIONAL) Default True. Whether this is a "submission" or a "now playing" notification.
     *
     * @returns {void}
     */
    this.scrobble = subsonicMethod({
      method: 'GET',
      path: 'scrobble',
      urlParams: ['id'],
      minVersion: '1.5.0',
    });
  }
};
