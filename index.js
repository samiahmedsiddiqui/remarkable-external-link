"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detect_external_link_1 = __importDefault(require("detect-external-link"));
const linkExternalStack = [];
function remarkableExternalLink(md, options) {
    const defaultOptions = {
        'rel': 'noopener',
        'target': '_blank',
        'externalOnly': true,
    };
    const defaultOpenRender = md.renderer.rules.link_open;
    const defaultCloseRender = md.renderer.rules.link_close;
    const finalConfig = Object.assign({}, defaultOptions, options);
    const externalLinkConfig = {
        hosts: [],
    };
    if (finalConfig.hosts) {
        externalLinkConfig.hosts = finalConfig.hosts;
    }
    else if (finalConfig.host) {
        externalLinkConfig.hosts = [finalConfig.host];
    }
    md.renderer.rules.link_open = function (tokens, idx, ...args) {
        let result = defaultOpenRender(tokens, idx, ...args);
        let externalLink = false;
        if (tokens[idx] && tokens[idx].href) {
            const urlHref = tokens[idx].href;
            if ((0, detect_external_link_1.default)(urlHref, externalLinkConfig)) {
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
exports.default = remarkableExternalLink;
