const subsonicResource = require('../subsonicResource');
const subsonicMethod = require('../subsonicMethod');

/**
 * @typedef musicFolder
 * @property {string} id
 * @property {string} name
 *
 * @typedef musicFolders
 * @property {Array<musicFolder>} musicFolders
 */

/**
 * @typedef indexArtist
 * @property {string} id
 * @property {string} name
 * @property {string} artistImageUrl
 *
 * @typedef index
 * @property {string} name
 * @property {Array<indexArtist>} artist
 *
 * @typedef indexes
 * @property {number} lastModified
 * @property {string} ignoredArticles
 * @property {Array<index>} index
 */

/**
 * @typedef directoryAlbum
 * @property {string} id
 * @property {string} parent
 * @property {boolean} isDir
 * @property {string} title
 * @property {string} album
 * @property {string} artist
 * @property {number} year
 * @property {string} genre
 * @property {string} coverArt
 * @property {number} playCount
 * @property {string} created
 *
 * @typedef musicDirectory
 * @property {string} id
 * @property {string} name
 * @property {Array<directoryAlbum>} child
 */

/**
 * @typedef genreDetails
 * @property {number} songCount
 * @property {number} albumCount
 * @property {string} value
 *
 * @typedef genre
 * @property {Array<genreDetails>} genre
 *
 * @typedef genres
 * @property {genre} genres
 */

/**
 * @typedef artist
 * @property {string} id
 * @property {string} name
 * @property {string} coverArt
 * @property {string} artistImageUrl
 * @property {number} albumCount
 *
 * @typedef artistIndex
 * @property {string} name
 * @property {Array<artist>} artist
 *
 * @typedef artists
 * @property {string} ignoredArticles
 * @property {Array<artistIndex} index
 */

/**
 * @typedef artistsAlbum
 * @property {string} id
 * @property {string} name
 * @property {string} artist
 * @property {string} artistId
 * @property {string} coverArt
 * @property {number} songCount
 * @property {number} duration
 * @property {number} playCount
 * @property {string} created
 * @property {number} year
 * @property {string} genre
 *
 * @typedef aristDetails
 * @property {string} id
 * @property {string} name
 * @property {string} coverArt
 * @property {string} artistImageUrl
 * @property {number} albumCount
 * @property {Array<artistAlbum>} album
 */

/**
 * @typedef song
 * @property {string} id
 * @property {string} parent
 * @property {boolean} isDir
 * @property {string} title
 * @property {string} album
 * @property {string} artist
 * @property {number} track
 * @property {number} year
 * @property {string} genre
 * @property {string} coverArt
 * @property {number} size
 * @property {string} contentType
 * @property {string} suffix
 * @property {number} duration
 * @property {number} bitRate
 * @property {string} path
 * @property {number} playCount
 * @property {number} discNumber
 * @property {string} created
 * @property {string} albumId
 * @property {string} artistId
 * @property {string} type
 *
 * @typedef album
 * @property {string} id
 * @property {string} name
 * @property {string} artist
 * @property {string} artistId
 * @property {string} coverArt
 * @property {number} songCount
 * @property {number} duration
 * @property {number} playCount
 * @property {string} created
 * @property {number} year
 * @property {string} genre
 * @property {Array<song>} song
 */

/**
 * @typedef video
 * @property {string} id
 * @property {string} parent
 * @property {boolean} isDir
 * @property {string} title
 * @property {string} album
 * @property {string} artist
 * @property {number} size
 * @property {string} contentType
 * @property {string} suffix
 * @property {string} path
 * @property {boolean} isVideo
 * @property {number} playCount
 * @property {string} created
 * @property {string} type
 *
 * @typedef videos
 * @property {Array<video>} video
 *
 * @typedef videoInfo
 * @property {string} id
 */

/**
 * @typedef similarArtist
 * @property {string} id
 * @property {string} name
 * @property {string} artistImageUrl
 *
 * @typedef artistInfo
 * @property {string} biography
 * @property {string} lastFmUrl
 * @property {string} smallImageUrl
 * @property {string} mediumImageUrl
 * @property {string} largeImageUrl
 * @property {Array<similarArtist>} similarArtist
 */

/**
 * @typedef albumInfo
 * @property {string} lastFmUrl
 * @property {string} smallImageUrl
 * @property {string} mediumImageUrl
 * @property {string} largeImageUrl
 */

/**
 * @typedef similarSongs
 * @property {Array<song>} song
 */

/**
 * @typedef topSongs
 * @property {Array<song>} song
 */

/**
 * @typedef albumList
 * @property {Array<directoryAlbum>} album
 */

/**
 * @typedef randomSongs
 * @property {Array<song>} song
 */

/**
 * @typedef songsByGenre
 * @property {Array<song>} song
 */

/**
 * @typedef nowPlayingEntry
 * Also includes the rest of properties from {`song`}
 * @property {string} username
 * @property {number} minutesAgo
 * @property {number} playerId
 *
 * @typedef nowPlaying
 * @property {Aarray<nowPlayingEntry>} entry
 */

module.exports = class Browsing extends subsonicResource {
  constructor(subsonic) {
    super(subsonic);

    /**
     * UReturns all configured top-level music folders. Takes no extra parameters.
     *
     * @returns {musicFolders}
     */
    this.getMusicFolders = subsonicMethod({
      method: 'GET',
      path: 'getMusicFolders',
      minVersion: '1.0.0',
    });

    /**
     * Returns an indexed structure of all artists.
     *
     * @param {string} musicFolderId If specified, only return artists in the music folder with the given ID. See `getMusicFolders`.
     * @param {number} ifModifiedSince If specified, only return a result if the artist collection has changed since the given time (in milliseconds since 1 Jan 1970).
     *
     * @returns {indexes}
     */
    this.getIndexes = subsonicMethod({
      method: 'GET',
      path: 'getIndexes',
      urlParams: ['musicFolderId', 'ifModifiedSince'],
      minVersion: '1.0.0',
    });

    /**
     * Returns a listing of all files in a music directory. Typically used to get list of albums for an artist, or list of songs for an album.
     *
     * @param {string} id A string which uniquely identifies the music folder. Obtained by calls to getIndexes or getMusicDirectory.
     *
     * @returns {musicDirectory}
     */
    this.getMusicDirectory = subsonicMethod({
      method: 'GET',
      path: 'getMusicDirectory',
      urlParams: ['id'],
      minVersion: '1.0.0',
    });

    /**
     * Returns all genres.
     *
     * @returns {genres}
     */
    this.getGenres = subsonicMethod({
      method: 'GET',
      path: 'getGenres',
      minVersion: '1.9.0',
    });

    /**
     * Similar to `getIndexes`, but organizes music according to ID3 tags.
     *
     * @param {string} musicFolderId If specified, only return artists in the music folder with the given ID. See `getMusicFolders`.
     *
     * @returns {artists}
     */
    this.getArtists = subsonicMethod({
      method: 'GET',
      path: 'getArtists',
      urlParams: ['musicFolderId'],
      minVersion: '1.8.0',
    });

    /**
     * Returns details for an artist, including a list of albums. This method organizes music according to ID3 tags.
     *
     * @param {string} id The artist ID
     *
     * @returns {artists}
     */
    this.getArtist = subsonicMethod({
      method: 'GET',
      path: 'getArtist',
      urlParams: ['id'],
      minVersion: '1.8.0',
    });

    /**
     * Returns details for an album, including a list of songs. This method organizes music according to ID3 tags.
     *
     * @param {string} id The album ID
     *
     * @returns {album}
     */
    this.getAlbum = subsonicMethod({
      method: 'GET',
      path: 'getAlbum',
      urlParams: ['id'],
      minVersion: '1.8.0',
    });

    /**
     * Returns details for a song
     *
     * @param {string} id The song ID
     *
     * @returns {song}
     */
    this.getSong = subsonicMethod({
      method: 'GET',
      path: 'getSong',
      urlParams: ['id'],
      minVersion: '1.8.0',
    });

    /**
     * Returns all video files.
     *
     * @returns {videos}
     */
    this.getVideos = subsonicMethod({
      method: 'GET',
      path: 'getVideos',
      minVersion: '1.8.0',
    });

    /**
     * Returns details for a video, including information about available audio tracks, subtitles (captions) and conversions.
     *
     * @param {string} id The video ID
     *
     * @returns {videoInfo}
     */
    this.getVideoInfo = subsonicMethod({
      method: 'GET',
      path: 'getVideoInfo',
      urlParams: ['id'],
      minVersion: '1.14.0',
    });

    /**
     * Returns artist info with biography, image URLs and similar artists, using data from last.fm.
     *
     * @param {string} id The artist, album or song ID.
     * @param {number} count (OPTIONAL) Max number of similar artists to return. Default `20`
     * @param {boolean} includeNotPresent (OPTIONAL) Whether to return artists that are not present in the media library. Default `false`
     *
     * @returns {artistInfo}
     */
    this.getArtistInfo = subsonicMethod({
      method: 'GET',
      path: 'getArtistInfo',
      urlParams: ['id', 'count', 'includeNotPresent'],
      minVersion: '1.11.0',
    });

    /**
     * Similar to `getArtistInfo`, but organizes music according to ID3 tags.
     *
     * @param {string} id The artist, album or song ID.
     * @param {number} count (OPTIONAL) Max number of similar artists to return. Default `20`
     * @param {boolean} includeNotPresent (OPTIONAL) Whether to return artists that are not present in the media library. Default `false`
     *
     * @returns {artistInfo}
     */
    this.getArtistInfo2 = subsonicMethod({
      method: 'GET',
      path: 'getArtistInfo2',
      urlParams: ['id', 'count', 'includeNotPresent'],
      minVersion: '1.11.0',
    });

    /**
     * Returns album notes, image URLs etc, using data from last.fm.
     *
     * @param {string} id The album or song ID.
     *
     * @returns {albumInfo}
     */
    this.getAlbumInfo = subsonicMethod({
      method: 'GET',
      path: 'getAlbumInfo',
      urlParams: ['id'],
      minVersion: '1.14.0',
    });

    /**
     * Similar to `getAlbumInfo`, but organizes music according to ID3 tags.
     *
     * @param {string} id The album or song ID.
     *
     * @returns {albumInfo}
     */
    this.getAlbumInfo2 = subsonicMethod({
      method: 'GET',
      path: 'getAlbumInfo2',
      urlParams: ['id'],
      minVersion: '1.14.0',
    });

    /**
     * Returns a random collection of songs from the given artist and similar artists, using data from last.fm. Typically used for artist radio features.
     *
     * @param {string} id The album or song ID.
     * @param {number} count (OPTIONAL) Max number of songs to return. Default `50`
     *
     * @returns {similarSongs}
     */
    this.getSimilarSongs = subsonicMethod({
      method: 'GET',
      path: 'getSimilarSongs',
      urlParams: ['id', 'count'],
      minVersion: '1.11.0',
    });

    /**
     * Similar to `getSimilarSongs`, but organizes music according to ID3 tags.
     *
     * @param {string} id The album or song ID.
     * @param {number} count (OPTIONAL) Max number of songs to return. Default `50`
     *
     * @returns {similarSongs}
     */
    this.getSimilarSongs2 = subsonicMethod({
      method: 'GET',
      path: 'getSimilarSongs2',
      urlParams: ['id', 'count'],
      minVersion: '1.11.0',
    });

    /**
     * Returns top songs for the given artist, using data from last.fm.
     *
     * @param {string} arist The artist's name.
     * @param {number} count (OPTIONAL) Max number of songs to return. Default `50`
     *
     * @returns {topSongs}
     */
    this.getTopSongs = subsonicMethod({
      method: 'GET',
      path: 'getTopSongs',
      urlParams: ['id', 'count'],
      minVersion: '1.13.0',
    });

    /**
     * Returns a list of random, newest, highest rated etc. albums. Similar to the album lists on the home page of the Subsonic web interface.
     *
     * @param {string} type The list type. Must be one of the following: `random`, `newest`, `highest`, `frequent`, `recent`. Since 1.8.0 you can also use `alphabeticalByName` or `alphabeticalByArtist` to page through all albums alphabetically, and `starred` to retrieve starred albums. Since 1.10.1 you can use `byYear` and `byGenre` to list albums in a given year range or genre.
     *
     * @param {number} data.size (OPTIONAL) The number of albums to return. Max `500`. Default `10`
     * @param {number} data.offset (OPTIONAL) The list offset. Useful if you for example want to page through the list of newest albums.
     * @param {number} data.fromYear (REQUIRED if `type === byYear`) The first year in the range. If `fromYear > toYear` a reverse chronological list is returned.
     * @param {number} data.toYear (REQUIRED if `type === byYear`) The last year in the range.
     * @param {string} data.genre (REQUIRED if `type === byGenre`) The name of the genre, e.g., "Rock".
     * @param {number} data.musicFolderId (OPTIONAL) (Since 1.11.0) Only return albums in the music folder with the given ID. See `getMusicFolders`.
     *
     * @returns {albumList}
     */
    this.getAlbumList = subsonicMethod({
      method: 'GET',
      path: 'getAlbumList',
      urlParams: ['type'],
      minVersion: '1.2.0',
    });

    /**
     * Similar to getAlbumList, but organizes music according to ID3 tags.
     *
     * @param {string} type The list type. Must be one of the following: `random`, `newest`, `highest`, `frequent`, `recent`, `alphabeticalByName` or `alphabeticalByArtist`, or `starred`. Since 1.10.1 you can use `byYear` and `byGenre` to list albums in a given year range or genre.
     *
     * @param {number} data.size (OPTIONAL) The number of albums to return. Max `500`. Default `10`
     * @param {number} data.offset (OPTIONAL) The list offset. Useful if you for example want to page through the list of newest albums.
     * @param {number} data.fromYear (REQUIRED if `type === byYear`) The first year in the range. If `fromYear > toYear` a reverse chronological list is returned.
     * @param {number} data.toYear (REQUIRED if `type === byYear`) The last year in the range.
     * @param {string} data.genre (REQUIRED if `type === byGenre`) The name of the genre, e.g., "Rock".
     * @param {number} data.musicFolderId (OPTIONAL) (Since 1.12.0) Only return albums in the music folder with the given ID. See `getMusicFolders`.
     *
     * @returns {albumList}
     */
    this.getAlbumList2 = subsonicMethod({
      method: 'GET',
      path: 'getAlbumList2',
      urlParams: ['type'],
      minVersion: '1.8.0',
    });

    /**
     * Returns random songs matching the given criteria.
     *
     * @param {number} data.size (OPTIONAL) The number of albums to return. Max `500`. Default `10`
     * @param {string} data.genre (OPTIONAL) Only returns songs belonging to this genre.
     * @param {number} data.fromYear (OPTIONAL) Only return songs published after or in this year.
     * @param {number} data.toYear (OPTIONAL) Only return songs published before or in this year.
     * @param {number} data.musicFolderId (OPTIONAL) (Since 1.12.0) Only return albums in the music folder with the given ID. See `getMusicFolders`.
     *
     * @returns {randomSongs}
     */
    this.getRandomSongs = subsonicMethod({
      method: 'GET',
      path: 'getRandomSongs',
      minVersion: '1.2.0',
    });

    /**
     * Returns songs in a given genre.
     *
     * @param {string} genre The genre, as returned by `getGenres`.
     * @param {number} data.count (OPTIONAL) The number of albums to return. Max `500`. Default `10`
     * @param {number} data.offest (OPTIONAL) The offset. Useful if you want to page through the songs in a genre.
     * @param {number} data.musicFolderId (OPTIONAL) (Since 1.12.0) Only return albums in the music folder with the given ID. See `getMusicFolders`.
     *
     * @returns {songsByGenre}
     */
    this.getSongsByGenre = subsonicMethod({
      method: 'GET',
      path: 'getSongsByGenre',
      urlParams: ['genre'],
      minVersion: '1.9.0',
    });

    /**
     * Returns what is currently being played by all users. Takes no extra parameters.
     *
     * @returns {nowPlaying}
     */
    this.getNowPlaying = subsonicMethod({
      method: 'GET',
      path: 'getNowPlaying',
      minVersion: '1.0.0',
    });

    /**
     * Returns starred songs, albums and artists.
     *
     * @returns {starred}
     */
    this.getStarred = subsonicMethod({
      method: 'GET',
      path: 'getStarred',
      // urlParams: ['musicFolderId'],
      minVersion: '1.12.0',
    });

    /**
     * Similar to getStarred, but organizes music according to ID3 tags.
     *
     * @returns {starred2}
     */
    this.getStarred = subsonicMethod({
      method: 'GET',
      path: 'getStarred2',
      // urlParams: ['musicFolderId'],
      minVersion: '1.12.0',
    });
  }
};
