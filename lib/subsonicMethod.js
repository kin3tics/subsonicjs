var utils = require('./utils');

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'system' or 'browsing')
 * @param [spec.urlParams=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API to generate the url.
 */
function subsonicMethod(spec) {
  return function () {
    var self = this;
    const args = [...arguments];
    const argObj = mapParamsToObject(spec.params, spec.urlParams, args);

    return utils.createRequest(self._subsonic, spec, argObj);
  };
}

function mapParamsToObject(params, urlParams, args) {
  const argObj = params ? params : {};
  // Map url params form args
  if (urlParams && urlParams.length > 0) {
    urlParams.forEach((param, i) => {
      argObj[param] = args[0];
      args = args.slice(1);
    });
  }
  // If args remain; set as the data object
  if (args && args.length > 0) {
    argObj.data = args[0];
  }
  return argObj;
}

module.exports = subsonicMethod;
