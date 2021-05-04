"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
function remarkableExternalLink(md, options) {
    const configHosts = [];
    const defaultOptions = {
        'rel': 'nofollow noreferrer noopener',
        'target': '_blank'
    };
    const defaultRender = md.renderer.rules.link_open;
    const finalConfig = Object.assign({}, defaultOptions, options);
    if (finalConfig.hosts) {
        let singleHost;
        for (singleHost of finalConfig.hosts) {
            if (singleHost.indexOf('http://') === 0 || singleHost.indexOf('https://') === 0) {
                configHosts.push(new url_1.URL(singleHost).hostname);
            }
            else {
                configHosts.push(singleHost);
            }
        }
    }
    else if (finalConfig.host) {
        if (finalConfig.host.indexOf('http://') === 0 || finalConfig.host.indexOf('https://') === 0) {
            configHosts.push(new url_1.URL(finalConfig.host).hostname);
        }
        else {
            configHosts.push(finalConfig.host);
        }
    }
    md.renderer.rules.link_open = function (tokens, idx, ...args) {
        let result = defaultRender(tokens, idx, ...args);
        if (tokens[idx] && tokens[idx].href) {
            const urlHref = tokens[idx].href;
            let origin = '';
            if (urlHref.indexOf('http://') === 0 || urlHref.indexOf('https://') === 0) {
                origin = new url_1.URL(urlHref).hostname;
            }
            else if (urlHref.indexOf('://') === 0) {
                origin = new url_1.URL('https' + urlHref).hostname;
            }
            if (origin) {
                if (configHosts.length === 0 || configHosts.indexOf(origin) === -1) {
                    result = result.replace('>', ' target="' + finalConfig.target + '" rel="' + finalConfig.rel + '">');
                }
            }
        }
        return result;
    };
}
exports.default = remarkableExternalLink;
