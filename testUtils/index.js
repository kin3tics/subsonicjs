'use strict';

require('dotenv').config();
// NOTE: testUtils should be require'd before anything else in each spec file!
require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
require('chai').use(require('chai-as-promised'));

const md5 = require('md5');

const utils = (module.exports = {
  getUserKey: () => {
    const key = md5(`${process.env.PASSWORD}${process.env.SALT}`);
    return key;
  },

  getSpyableSubsonic: () => {
    // Provide a testable subsonic instance
    // That is, with mock-requests built in and hookable

    const subsonic = require('../lib/subsonic');
    const subsonicInstance = subsonic(
      process.env.USERNAME,
      utils.getUserKey(),
      process.env.SALT,
      process.env.HOST
    );

    subsonicInstance.REQUESTS = [];

    for (const i in subsonicInstance) {
      makeInstanceSpyable(subsonicInstance, subsonicInstance[i]);
    }

    function makeInstanceSpyable(subsonicInstance, thisInstance) {
      if (thisInstance instanceof subsonic.SubsonicResource) {
        patchRequest(subsonicInstance, thisInstance);
      }
    }

    function patchRequest(subsonicInstance, instance) {
      instance._request = function (
        method,
        host,
        url,
        data,
        auth,
        options,
        cb
      ) {
        const req = (subsonicInstance.LAST_REQUEST = {
          method,
          url,
          data,
          headers: options.headers || {},
          settings: options.settings || {},
        });
        if (auth) {
          req.auth = auth;
        }
        if (host) {
          req.host = host;
        }
        subsonicInstance.REQUESTS.push(req);
        cb.call(this, null, {});
      };
    }

    return subsonicInstance;
  },

  /**
   * A utility where cleanup functions can be registered to be called post-spec.
   * CleanupUtility will automatically register on the mocha afterEach hook,
   * ensuring its called after each descendent-describe block.
   */
  CleanupUtility: (() => {
    CleanupUtility.DEFAULT_TIMEOUT = 20000;

    function CleanupUtility(timeout) {
      const self = this;
      this._cleanupFns = [];
      this._subsonic = require('../lib/subsonic')(
        process.env.USERNAME,
        utils.getUserKey(),
        process.env.SALT,
        process.env.HOST
      );
      afterEach(function (done) {
        this.timeout(timeout || CleanupUtility.DEFAULT_TIMEOUT);
        return self.doCleanup(done);
      });
    }

    CleanupUtility.prototype = {
      doCleanup(done) {
        const cleanups = this._cleanupFns;
        const total = cleanups.length;
        let completed = 0;
        let fn;
        while ((fn = cleanups.shift())) {
          const promise = fn.call(this);
          if (!promise || !promise.then) {
            throw new Error(
              'CleanupUtility expects cleanup functions to return promises!'
            );
          }
          promise.then(
            () => {
              // cleanup successful
              completed += 1;
              if (completed === total) {
                done();
              }
            },
            (err) => {
              // not successful
              throw err;
            }
          );
        }
        if (total === 0) {
          done();
        }
      },
      add(fn) {
        this._cleanupFns.push(fn);
      },
      //   deleteCustomer(custId) {
      //     this.add(function() {
      //       return this._stripe.customers.del(custId);
      //     });
      //   },
      //   deletePlan(pId) {
      //     this.add(function() {
      //       return this._stripe.plans.del(pId);
      //     });
      //   },
      //   deleteCoupon(cId) {
      //     this.add(function() {
      //       return this._stripe.coupons.del(cId);
      //     });
      //   },
      //   deleteInvoiceItem(iiId) {
      //     this.add(function() {
      //       return this._stripe.invoiceItems.del(iiId);
      //     });
      //  },
    };

    return CleanupUtility;
  })(),

  /**
   * Get a random string for test Object creation
   */
  getRandomString: () => {
    return Math.random().toString(36).slice(2);
  },

  envSupportsForAwait: () => {
    return typeof Symbol !== 'undefined' && Symbol.asyncIterator;
  },

  envSupportsAwait: () => {
    try {
      eval('(async function() {})'); // eslint-disable-line no-eval
      return true;
    } catch (err) {
      return false;
    }
  },
});
