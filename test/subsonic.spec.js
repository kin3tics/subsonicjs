/* eslint-disable new-cap */

'use strict';

const testUtils = require('../testUtils');
const Subsonic = require('../lib/subsonic');

const expect = require('chai').expect;

describe('Subsonic Module', function () {
  this.timeout(20000);

  describe('config object', () => {
    it('should only accept either an object or a string', () => {
      expect(() => {
        Subsonic(
          process.env.USERNAME,
          testUtils.getUserKey(),
          process.env.SALT,
          123
        );
      }).to.throw(/Host config must either be an object or a string/);

      expect(() => {
        Subsonic(
          process.env.USERNAME,
          testUtils.getUserKey(),
          process.env.SALT,
          ['2019-12-12']
        );
      }).to.throw(/Host config must either be an object or a string/);

      expect(() => {
        Subsonic(
          process.env.USERNAME,
          testUtils.getUserKey(),
          process.env.SALT,
          '2019-12-12'
        );
      }).to.not.throw();

      expect(() => {
        Subsonic(
          process.env.USERNAME,
          testUtils.getUserKey(),
          process.env.SALT,
          {
            version: '1.16.1',
          }
        );
      }).to.not.throw();
    });

    it('should only contain allowed properties', () => {
      expect(() => {
        Subsonic(
          process.env.USERNAME,
          testUtils.getUserKey(),
          process.env.SALT,
          {
            foo: 'bar',
            version: '1.16.1',
          }
        );
      }).to.throw(/Host config object may only contain the following:/);

      expect(() => {
        Subsonic(
          process.env.USERNAME,
          testUtils.getUserKey(),
          process.env.SALT,
          {
            protocol: 'http',
            host: 'foo.subsonic.org',
            port: 321,
            timeout: 60,
            client: 'testClient',
            format: 'json',
            version: '1.16.1',
          }
        );
      }).to.not.throw();
    });
  });

  //   describe('errors', () => {
  //     it('Exports errors as types', () => {
  //       const Subsonic = require('../lib/subsonic');
  //       expect(
  //         new Subsonic.errors.SubsonicInvalidRequestError({
  //           message: 'error',
  //         }).type
  //       ).to.equal('SubsonicInvalidRequestError');
  //     });
  //   });
});
