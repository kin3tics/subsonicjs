const subsonic = require('../../testUtils').getSpyableSubsonic();
const expect = require('chai').expect;

describe('System Resource', function() {
  this.timeout(20000);

  describe('ping', () => {
    it('should return an expected object', () => {
      return subsonic.system.ping().then((res) =>
        expect(res).to.be.deep.equal({
          status: 'ok',
          version: '1.16.1',
        })
      );
    });
  });
  describe('getLicense', () => {
    it('should return an expected object', () => {
      return subsonic.system
        .getLicense()
        .then((res) =>
          expect(res).to.include.all.keys('status', 'version', 'license')
        );
    });
  });
});
