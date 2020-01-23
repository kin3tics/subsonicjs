# subsonicjs

NOTE: Alpha release; Will have basic functionality working soon.

[![npm version](https://badge.fury.io/js/subsonicjs.svg)](https://badge.fury.io/js/subsonicjs)

An abstraction of the subsonic API as a node package. This package attempts to line up API methods and their parameters as close to 1:1 with the original documentation [Official Subsonic API Docs](http://www.subsonic.org/pages/api.jsp).

## Changelog

Changelog is available here: [Changelog](https://github.com/kin3tics/subsonicjs/blob/master/CHANGELOG.md)

## Installation

`npm install --save subsonicjs`

## Usage

The package needs to be configured with your subsonic username, a password token, and the salt used to generate the password token. To create a password token perform an md5 encryption of the password and salt. (e.g. salt = 'secret'; token = md5('password'+'secret');)

```javascript
var subsonic = require("subsonicjs")(username, token, salt, url);

var pingServer = await subsonic.system.ping();
```

## Initialize with config object

The package can also be configured with several options. The only required option is `host` all other options are optional.

```javascript
var subsonic = require("subsonicjs")(username, token, salt, {
    protocol: 'http',
    host: 'www.subsonic.org',
    port: 80,
    timeout: 30,
    client: 'subsonicjs',
    version: '1.16.1'
});
```

| Option| Default | Description |
| --- | --- | --- |
| `protocol` | http | Protocol to connect to server. (e.g. `http`,`https`, etc ) |
| `host` | `null` | Required. Host subsonic server which requests are made to. |
| `port` | 80 | Port on subsonic server which requests are made to. |
| `timeout` | 30 | Request timeout in seconds. |
| `client` | subsonicjs | A unique string identifying the client application. |
| `version` | 1.16.1 | Subsonic server API version to be used. |

## Using Promises

Nearly every method returns a chainable promise which can be used.

```javascript
subsonic.browsing
    .getIndexes()
    .then((indexes) => {
        let firstIndexedArtist = indexes.index[0].artist[0];
        return subsonic.browsing().getArtist(firstIndexedArtist.id);
    })
    .then((artist) => {
        //First artist details according to index order
    }).catch((err) => {
        // Handle error
    })
```

## Promise Exceptions

A select few methods don't return promises as the end data object is not JSON but rather Binary. In these instances, the method will return a uri for the end client to consume.

```javascript
subsonic.media.stream(id); //Will return stream uri for media player to consume
subsonic.media.getCoverArt(id); //Will return cover art uri for image components to consume
```

## Optional Parameters

If a call has optional parameters, you can add them to the end of the method as an object.

```javascript
subsonic.playlists
    .updatePlaylist(playlistId, {
        name: 'My Playlist',
        comment: 'My playlist description'
    })
    .then((response) => {
        //Handle response
    })
```

## API Layout

The package has broken api calls out into different buckets for organization purposes. The following table contains the buckets and methods. Access methods through the following: `subsonic.{bucket}.{method}()`. Largely follows organization from official API docs, but some methods were moved to other areas. 

| Bucket | Methods |
| --- | --- |
| `bookmarks` | `getBookmarks`, `createBookmark`, `deleteBookmark` |
| `browsing` | `getMusicFolders`, `getIndexes`, `getMusicDirectory`, `getGenres`, `getArtists`, `getArtist`, `getAlbum`, `getSong`, `getVideos`, `getVideoInfo`, `getArtistInfo`, `getArtistInfo2`, `getAlbumInfo`, `getAlbumInfo2`, `getSimilarSongs`, `getSimilarSongs2`, `getTopSongs`, `getAlbumList`, `getAlbumList2`, `getRandomSongs`, `getSongsByGenre`, `getNowPlaying`, `getStarred` |
| `chat` | `getChatMessages`, `addChatMessage` |
| `internetRadio` | `getInternetRadioStations`, `createInternetRadioStation`, `updateInternetRadioStation`, `deleteInternetRadioStation` |
| `jukeboxControl` | `jukeboxControl` |
| `media` | `stream`, `download`, `getCaptions`, `getCoverArt`, `getLyrics`, `getAvatar`, `star`, `unstar`, `setRating`, `scrobble` |
| `playlists` | `getPlaylists`, `getPlaylist`, `createPlaylist`, `updatePlaylist`, `deletePlaylist` |
| `playQueue` | `getPlayQueue`, `savePlayQueue` |
| `podcasts` | `getPodcasts`, `getNewestPodcasts`, `refreshPodcasts`, `createPodcastChannel`, `deletePodcastChannel`, `deletePodcastEpisode`, `downloadPodcastEpisode` |
| `searching` | `search2`, `search3` |
| `sharing` | `getShares`, `createShare`, `updateShare`, `deleteShare` |
| `system` | `ping`, `getLicense`, `getScanStatus`, `startScan` |
