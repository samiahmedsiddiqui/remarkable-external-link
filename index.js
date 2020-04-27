'use strict';

var defaultOptions = {
  target: '_blank',
  rel: 'nofollow noreferrer noopener'
};
var url = require('url');

function remarkableExternalLink (md, options) {
  // Enumerable own properties from one or more source objects
  var config = Object.assign({}, defaultOptions, options);
  // Define empty string
  var configHost = '';
  // Save original method to invoke.
  var originalRender = md.renderer.rules.link_open;

  if (config.host) {
    // Parse and normalize hostname.
    configHost = url.parse(config.host).host;
  }

  md.renderer.rules.link_open = function() {
    var href = '';
    var regexp = /href="([^"]*)"/;
    var result = originalRender.apply(null, arguments);

    href = url.parse(regexp.exec(result)[1]);
    if (href.host) {
      if (configHost === '' || href.host !== configHost) {
        result = result.replace('>', ' target="' + config.target + '" rel="' + config.rel + '">');
      }
    }

    return result;
  };
};

module.exports = remarkableExternalLink;
