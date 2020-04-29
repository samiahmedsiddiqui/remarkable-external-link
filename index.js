'use strict';

var url = require('url');

function remarkableExternalLink (md, options) {
  var config;
  var configHost = '';
  var defaultOptions = {
    target: '_blank',
    rel: 'nofollow noreferrer noopener'
  };
  var defaultRender = md.renderer.rules.link_open;

  config = Object.assign({}, defaultOptions, options);
  if (config.host) {
    configHost = url.parse(config.host).host;
  }

  md.renderer.rules.link_open = function (tokens, idx) {
    var href = '';
    var result = defaultRender.apply(null, arguments);

    if (tokens[idx] && tokens[idx].href) {
      href = url.parse(tokens[idx].href);
      if (href.host) {
        if (configHost === '' || href.host !== configHost) {
          if (tokens[idx].target) {
            result = result.replace('target="' + tokens[idx].target + '"', 'target="' + config.target + '">');
          } else {
            result = result.replace('>', ' target="' + config.target + '">');
          }
          if (tokens[idx].rel) {
            result = result.replace('rel="' + tokens[idx].rel + '"', 'rel="' + config.rel + '">');
          } else {
            result = result.replace('>', ' rel="' + config.rel + '">');
          }
        }
      }
    }

    return result;
  };
};

module.exports = remarkableExternalLink;
