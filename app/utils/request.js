
const DEFAULT_TIMEOUT = 30000;

/**
 * make a request using fetch
 *
 * the fetch call is wrapped in a Promise to be able to add a timeout
 * since the native implementation doesn't support it
 * FUTURE use native timeout implementation
 *
 * @param  {[type]} url     url to request
 * @param  {[type]} options fetch options. See docs: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
 * @param  {[type]} config  (optional) optional configs:
 *                          {
 *                            timeout: {number} - when to timout request in ms
 *                          }
 * @return {object}     when successful the data json is returned
 *                      when failure the error is returned
 */
async function call({ endpoint, options, config }) {
  const timeout = config && config.timeout;
  const promiseWrapper = await new Promise(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      return reject(new Error('timeout'));
    }, timeout || DEFAULT_TIMEOUT);

    try {
      const response = await fetch(endpoint, options);
      clearTimeout(timeoutId);

      const data = await response.json();
      return resolve(data);
    } catch (err) {
      return reject(err);
    }
  });

  return promiseWrapper;
}

async function get({ endpoint, options, config }) {
  return call({
    endpoint,
    options: {
      method: 'GET',
      ...options,
    },
    config,
  });
}

async function sendData(method, { endpoint, payload, options, config }) {
  return call({
    endpoint,
    options: {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
      ...options,
    },
    config,
  });
}

async function post({ endpoint, payload, options, config }) {
  return sendData('POST', { endpoint, payload, options, config });
}

async function put({ endpoint, payload, options, config }) {
  return sendData('PUT', { endpoint, payload, options, config });
}

// async function put(endpoint, requestJson, config) {
//   console.log('requestJson', requestJson)
//   // try {
//   return call(endpoint, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//     body: JSON.stringify(requestJson),
//     ...config,
//   });
//   // } catch (err) {
//   //   console.log('error during PUT request');
//   //   return err;
//   // }
// }

export default {
  get,
  put,
  post,
};
