'use strict';

var url = require('url');

function remarkableExternalLink(md, options) {
  var config;
  var configHosts = [];
  var defaultOptions = {
    target: '_blank',
    rel: 'nofollow noreferrer noopener'
  };
  var defaultRender = md.renderer.rules.link_open;

  config = Object.assign({}, defaultOptions, options);
  if (config.hosts) {
    for (const singleHost of config.hosts) {
      if (singleHost.indexOf('http://') === 0 || singleHost.indexOf('https://') === 0) {
        configHosts.push(url.parse(singleHost).host);
      } else {
        configHosts.push(url.parse('http://' + singleHost).host);
      }
    }
  } else {
    if (config.host) {
      if (config.host.indexOf('http://') === 0 || config.host.indexOf('https://') === 0) {
        configHosts.push(url.parse(config.host).host);
      } else {
        configHosts.push(url.parse('http://' + config.host).host);
      }
    }
  }

  md.renderer.rules.link_open = function (tokens, idx) {
    var href = '';
    var result = defaultRender.apply(null, arguments);

    if (tokens[idx] && tokens[idx].href) {
      href = url.parse(tokens[idx].href);
      if (href.host) {
        if (configHosts.length === 0 || !configHosts.includes(href.host)) {
          result = result.replace('>', ' target="' + config.target + '" rel="' + config.rel + '">');
        }
      }
    }

    return result;
  };
};

module.exports = remarkableExternalLink;
