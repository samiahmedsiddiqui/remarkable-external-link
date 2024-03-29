'use strict';

const { Remarkable } = require('remarkable');
const assert = require('assert');
const remarkableExternalLink = require('../index').default;

const testString = `This is an [Example](http://example.com) link, [Google](https://google.com) link, [Facebook](https://facebook.com) link, [Test Example](http://test.example.com/) link, [Test2 Example](http://test2.example.com/) link and [Relative](/docs/concept/) link.`;

describe('Test text insertion', () => {
  it('before external links', () => {
    const expectedOutput = `<p>This is an <a href="http://example.com">Example</a> link, [<a href="https://google.com" target="_blank" rel="noopener">-= Google =-</a>] (ext) link, [<a href="https://facebook.com" target="_blank" rel="noopener">-= Facebook =-</a>] (ext) link, <a href="http://test.example.com/">Test Example</a> link, [<a href="http://test2.example.com/" target="_blank" rel="noopener">-= Test2 Example =-</a>] (ext) link and <a href="/docs/concept/">Relative</a> link.</p>\n`;
    const md = new Remarkable();

    md.use(remarkableExternalLink, {
      'hosts': [
        'http://example.com',
        'http://test.example.com'
      ],
      'externalOnly': true,
      'beforeLink': '[',
      'beforeLinkText': '-= ',
      'afterLinkText': ' =-',
      'afterLink': '] (ext)',
    });

    assert.strictEqual(md.render(testString), expectedOutput);
  });

  it('before all links', () => {
    const expectedOutput = `<p>This is an [<a href="http://example.com">-= Example =-</a>] (ext) link, [<a href="https://google.com" target="_blank" rel="noopener">-= Google =-</a>] (ext) link, [<a href="https://facebook.com" target="_blank" rel="noopener">-= Facebook =-</a>] (ext) link, [<a href="http://test.example.com/">-= Test Example =-</a>] (ext) link, [<a href="http://test2.example.com/" target="_blank" rel="noopener">-= Test2 Example =-</a>] (ext) link and [<a href="/docs/concept/">-= Relative =-</a>] (ext) link.</p>\n`;
    const md = new Remarkable();

    md.use(remarkableExternalLink, {
      'hosts': [
        'http://example.com',
        'http://test.example.com'
      ],
      'externalOnly': false,
      'beforeLink': '[',
      'beforeLinkText': '-= ',
      'afterLinkText': ' =-',
      'afterLink': '] (ext)',
    });

    assert.strictEqual(md.render(testString), expectedOutput);
  });
});
