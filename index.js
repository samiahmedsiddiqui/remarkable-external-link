'use strict';

const url = require('url');

function remarkableExternalLink (md, options) {
  const defaultOptions = {
    'rel': 'nofollow noreferrer noopener',
    'target': '_blank'
  };
  const defaultRender = md.renderer.rules.link_open;
  const config = Object.assign({}, defaultOptions, options);

  const notExist = 0;

  var configHosts = [];

  if (config.hosts) {
    for (const singleHost of config.hosts) {
      if (singleHost.indexOf('http://') === notExist || singleHost.indexOf('https://') === notExist) {
        configHosts.push(url.parse(singleHost).host);
      } else {
        configHosts.push(url.parse('http://' + singleHost).host);
      }
    }
  } else if (config.host) {
    if (config.host.indexOf('http://') === notExist || config.host.indexOf('https://') === notExist) {
      configHosts.push(url.parse(config.host).host);
    } else {
      configHosts.push(url.parse('http://' + config.host).host);
    }
  }

  // eslint-disable-next-line camelcase
  md.renderer.rules.link_open = function (tokens, idx) {
    var result = defaultRender(...arguments);

    if (tokens[idx] && tokens[idx].href) {
      const href = url.parse(tokens[idx].href);
      if (href.host) {
        if (configHosts.length === notExist || !configHosts.includes(href.host)) {
          result = result.replace('>', ' target="' + config.target + '" rel="' + config.rel + '">');
        }
      }
    }

    return result;
  };
}

module.exports = remarkableExternalLink;
