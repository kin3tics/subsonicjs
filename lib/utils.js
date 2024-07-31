if (!fetch || typeof fetch !== 'function') {
  var fetch = require('node-fetch');
}
const qs = require('qs');
const constants = require('./constants');
const {CONTENT_TYPES} = constants;

function createRequest(api, params, args) {
  const apiVersion = api._getApiField('version');
  const versionCheck = compareVersionNumbers(params.minVersion, apiVersion);
  if (isNaN(versionCheck) || versionCheck === -1) {
    const message = `API Method ${params.path} is not supported in version ${apiVersion}. Minimum version ${params.minVersion}`;
    console.error(message);
    return {
      error: {
        status: 'failed',
        version: apiVersion,
        code: -1,
        message: message,
      },
    };
  }
  const protocol = api._getApiField('protocol');
  const host = api._getApiField('host');
  const port = api._getApiField('port');
  const path = `${buildBaseUrl(protocol, host, port)}/${params.path}`;
  const headers = api._getApiField('headers');
  const reqObj = {
    method: params.method,
    headers: headers,
  };
  const expectedType = params.contentType
    ? params.contentType
    : CONTENT_TYPES.JSON;

  const searchParamObj = buildBaseSearchParams(api);
  buildSearchParamsFromArgs(searchParamObj, args);
  const fullPath = `${path}?${qs.stringify(searchParamObj)}`;

  if (expectedType === CONTENT_TYPES.URI) {
    return fullPath;
  }

  let statusCode = 999;
  console.log(`fetching... ${fullPath}`);
  return fetch(fullPath, reqObj)
    .then((res) => {
      statusCode = res.status;
      if (statusCode >= 400) {
        return res.text();
      }
      let contentType = CONTENT_TYPES.TEXT;
      res.headers.forEach((value, name) => {
        if (name.toLowerCase() === 'content-type') {
          if (value.indexOf(CONTENT_TYPES.JSON) > -1) {
            contentType = CONTENT_TYPES.JSON;
          }
        }
      });

      if (expectedType === CONTENT_TYPES.BLOB) {
        return typeof res.buffer === 'function' ? res.buffer() : res.blob();
      } else if (contentType !== expectedType) {
        statusCode = 999;
        return `Unexpected content type. Expected '${expectedType}' but received ${contentType} `;
      } else if (contentType === CONTENT_TYPES.JSON) {
        return res.json();
      } else {
        return res.text();
      }
    })
    .then((rawData) => {
      if (statusCode >= 400) {
        return {
          error: {
            status: 'failed',
            version: apiVersion,
            code: statusCode,
            message: rawData,
          },
        };
      } else if (expectedType === CONTENT_TYPES.JSON) {
        return rawData['subsonic-response'];
      } else if (expectedType === CONTENT_TYPES.BLOB) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(rawData);
        });
      } else {
        return rawData;
      }
    })
    .catch((rej) => {
      console.log(rej);
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

function buildBaseUrl(protocol, host, port) {
  protocol = host.indexOf('http') > -1 ? '' : protocol;
  if (port == 80 || port == 443) port = null;
  host = host.replace(/\/$/, '') + (port ? `:${port}` : '') + '/rest';
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
          buildSearchParamsFromArgs(searchParamsObj, args[prop]);
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
    const v1partsInt = parseInt(v1parts[i], 10);
    const v2partsInt = parseInt(v2parts[i], 10);
    if (v1partsInt === v2partsInt) {
      continue;
    }
    if (v1partsInt < v2partsInt) {
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
