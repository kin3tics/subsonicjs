// if(!fetch || typeof fetch !== 'function') {
var fetch = require('node-fetch');
// }
const qs = require('qs');

function createRequest(api, params, args) {
  const apiVersion = api._getApiField('version');
  const versionCheck = compareVersionNumbers(params.minVersion, apiVersion);
  if (isNaN(versionCheck) || versionCheck === 1) {
    return {
      error: {
        status: 'failed',
        version: apiVersion,
        code: -1,
        message: `API Method ${params.path} is not supported in version ${apiVersion}. Minimum version ${params.minVersion}`,
      },
    };
  }
  const protocol = api._getApiField('protocol');
  const host = api._getApiField('host');
  const path = `${buildBaseUrl(protocol, host)}/${params.path}`;
  const headers = api._getApiField('headers');
  const reqObj = {
    method: params.method,
    headers: headers,
  };

  const searchParamObj = buildBaseSearchParams(api);
  buildSearchParamsFromArgs(searchParamObj, args);

  let statusCode = 999;
  // console.log(`fetching... ${path}?${qs.stringify(searchParamObj)}`);
  return fetch(`${path}?${qs.stringify(searchParamObj)}`, reqObj)
    .then((res) => {
      statusCode = res.status;
      if (statusCode >= 400) {
        return res.text();
      }
      return res.json();
    })
    .then((rawJson) => {
      if (statusCode >= 400) {
        return {
          error: {
            status: 'failed',
            version: apiVersion,
            code: statusCode,
            message: rawJson,
          },
        };
      } else {
        return rawJson['subsonic-response'];
      }
    })
    .catch((rej) => {
      return {
        error: {
          status: 'failed',
          version: apiVersion,
          code: 999,
          message: rej,
        },
      };
    });
}

function buildBaseSearchParams(api) {
  return {
    c: api._getApiField('client'),
    v: api._getApiField('version'),
    f: api._getApiField('format'),
    u: api._getApiField('username'),
    t: api._getApiField('token'),
    s: api._getApiField('salt'),
  };
}

function buildBaseUrl(protocol, host) {
  protocol = host.indexOf('http') > -1 ? '' : protocol;
  host = host[host.length - 1] !== '/' ? `${host}/rest` : `${host}rest`;
  return protocol.length > 0 ? `${protocol}://${host}` : host;
}

function buildSearchParamsFromArgs(searchParamsObj, args) {
  // If Passing a JSON Object as part of the payload, flatten out.
  for (var prop in args) {
    if (Object.prototype.hasOwnProperty.call(args, prop)) {
      if (typeof args[prop] === 'object') {
        if (args[prop] === null) {
          searchParamsObj[prop] = null;
        } else {
          buildSearchParams(searchParamsObj, args[prop]);
        }
      } else {
        searchParamsObj[prop] = args[prop];
      }
    }
  }
}

function isPositiveInteger(x) {
  // http://stackoverflow.com/a/1019526/11236
  return /^\d+$/.test(x);
}

function validateParts(parts) {
  for (var i = 0; i < parts.length; ++i) {
    if (!isPositiveInteger(parts[i])) {
      return false;
    }
  }
  return true;
}

function compareVersionNumbers(v1, v2) {
  var v1parts = v1.split('.');
  var v2parts = v2.split('.');
  if (!validateParts(v1parts) || !validateParts(v2parts)) {
    return NaN;
  }
  for (var i = 0; i < v1parts.length; ++i) {
    if (v2parts.length === i) {
      return 1;
    }
    if (v1parts[i] === v2parts[i]) {
      continue;
    }
    if (v1parts[i] > v2parts[i]) {
      return 1;
    }
    return -1;
  }
  if (v1parts.length != v2parts.length) {
    return -1;
  }
  return 0;
}

module.exports = {
  createRequest: createRequest,
};
