import * as types from '../types/index.d';
import { Remarkable } from 'remarkable';
import { URL } from 'url';

const linkExternalStack: Array<boolean> = [];

export default function remarkableExternalLink(md: Remarkable, options: types.configOptions): void {
  const configHosts: Array<string> = [];
  const defaultOptions: types.defaultOptions = {
    'rel': 'nofollow noreferrer noopener',
    'target': '_blank',
    'externalOnly': true,
  };
  const defaultOpenRender = md.renderer.rules.link_open;
  const defaultCloseRender = md.renderer.rules.link_close;

  const finalConfig: types.configOptions = Object.assign({}, defaultOptions, options);

  if (finalConfig.hosts) {
    let singleHost: string;
    for (singleHost of finalConfig.hosts) {
      if (singleHost.indexOf('http://') === 0 || singleHost.indexOf('https://') === 0) {
        configHosts.push(new URL(singleHost).hostname);
      } else {
        configHosts.push(singleHost);
      }
    }
  }
  /**
   * @deprecated Since version 1.1.0. Will be removed in later version of 2.0.0.
   * Use `hosts` instead.
   */
  else if (finalConfig.host) {
    if (finalConfig.host.indexOf('http://') === 0 || finalConfig.host.indexOf('https://') === 0) {
      configHosts.push(new URL(finalConfig.host).hostname);
    } else {
      configHosts.push(finalConfig.host);
    }
  }

  // eslint-disable-next-line camelcase
  md.renderer.rules.link_open = function (tokens: Remarkable.LinkOpenToken[], idx: number, ...args: []) {
    let result = defaultOpenRender(tokens, idx, ...args);
    let externalLink = false;

    if (tokens[idx] && tokens[idx].href) {
      const urlHref = tokens[idx].href;
      let origin = '';
      if (urlHref.indexOf('http://') === 0 || urlHref.indexOf('https://') === 0) {
        origin = new URL(urlHref).hostname;
      } else if (urlHref.indexOf('://') === 0) {
        origin = new URL('https' + urlHref).hostname;
      }

      if (origin) {
        if (configHosts.length === 0 || configHosts.indexOf(origin) === -1) {
          // eslint-disable-next-line max-len
          result = result.replace('>', ' target="' + finalConfig.target + '" rel="' + finalConfig.rel + '">');
          externalLink = true;
        }
      }
    }

    linkExternalStack.push(externalLink);
    if (externalLink || !finalConfig.externalOnly)
        result = (options.beforeLink || "") + result + (options.beforeLinkText || "");

    return result;
  };

  md.renderer.rules.link_close = function (tokens, idx, ...args) {
      let result = defaultCloseRender(tokens, idx, ...args);

      const externalLink = linkExternalStack.pop();
      if (externalLink || !finalConfig.externalOnly)
          result = (options.afterLinkText || "") + result + (options.afterLink || "");

      return result;
  };
}
