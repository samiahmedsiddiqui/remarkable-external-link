'use strict';

const { Remarkable } = require('remarkable');
const assert = require('assert');
const remarkableExternalLink = require('../index').default;

const testString = `This is an [Example](http://example.com) link, [Google](https://google.com) link, [Facebook](https://facebook.com) link, [Test Example](http://test.example.com/) link, [Test2 Example](http://test2.example.com/) link and [Relative](/docs/concept/) link.`;

describe('Test `external` links', () => {
  it('single domain', () => {
    const expectedOutput = `<p>This is an <a href="http://example.com">Example</a> link, <a href="https://google.com" target="_blank" rel="noopener">Google</a> link, <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a> link, <a href="http://test.example.com/" target="_blank" rel="noopener">Test Example</a> link, <a href="http://test2.example.com/" target="_blank" rel="noopener">Test2 Example</a> link and <a href="/docs/concept/">Relative</a> link.</p>\n`;
    const md = new Remarkable();

    md.use(remarkableExternalLink, {
      'hosts': ['http://example.com']
    });

    assert.strictEqual(md.render(testString), expectedOutput);
  });

  it('multiple domains', () => {
    const expectedOutput = `<p>This is an <a href="http://example.com">Example</a> link, <a href="https://google.com" target="_blank" rel="noopener">Google</a> link, <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a> link, <a href="http://test.example.com/">Test Example</a> link, <a href="http://test2.example.com/" target="_blank" rel="noopener">Test2 Example</a> link and <a href="/docs/concept/">Relative</a> link.</p>\n`;
    const md = new Remarkable();

    md.use(remarkableExternalLink, {
      'hosts': [
        'http://example.com',
        'http://test.example.com'
      ]
    });

    assert.strictEqual(md.render(testString), expectedOutput);
  });
});
