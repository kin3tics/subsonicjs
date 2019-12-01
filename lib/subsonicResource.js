// Any class built off of a SubsonicResource should have access to the
// base _subsonic class.
class SubsonicResource {
  constructor(subsonic) {
    this._subsonic = subsonic;
  }
}

module.exports = SubsonicResource;
