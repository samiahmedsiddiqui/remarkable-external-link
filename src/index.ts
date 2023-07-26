import * as types from '../types/index.d';
import detectExternalLink from 'detect-external-link';
import { Remarkable } from 'remarkable';

const linkExternalStack: Array<boolean> = [];

export default function remarkableExternalLink (md: Remarkable, options: types.configOptions): void {
  const defaultOptions: types.defaultOptions = {
    'rel': 'noopener',
    'target': '_blank',
    'externalOnly': true,
  };
  const defaultOpenRender = md.renderer.rules.link_open;
  const defaultCloseRender = md.renderer.rules.link_close;

  const finalConfig: types.configOptions = Object.assign({}, defaultOptions, options);

  let externalLinkConfig: types.detectExternalLinkConfig = {
    hosts: [],
  };

  if (finalConfig.hosts) {
    externalLinkConfig.hosts = finalConfig.hosts;
  }
  /**
   * @deprecated Since version 1.1.0. Will be removed in later version of 2.0.0.
   * Use `hosts` instead.
   */
  else if (finalConfig.host) {
    externalLinkConfig.hosts = [finalConfig.host];
  }

  // eslint-disable-next-line camelcase
  md.renderer.rules.link_open = function (tokens: Remarkable.LinkOpenToken[], idx: number, ...args: []) {
    let result = defaultOpenRender(tokens, idx, ...args);
    let externalLink = false;

    if (tokens[idx] && tokens[idx].href) {
      const urlHref = tokens[idx].href;

      if (detectExternalLink(urlHref, externalLinkConfig)) {
        // eslint-disable-next-line max-len
        result = result.replace('>', ' target="' + finalConfig.target + '" rel="' + finalConfig.rel + '">');
        externalLink = true;
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
