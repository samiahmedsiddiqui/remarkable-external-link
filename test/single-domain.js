const { Remarkable } = require('remarkable');
const externalLink = require('../index');
const md = new Remarkable();

const expectedOutput = `<p>This is an <a href="http://example.com">Example</a> link, <a href="https://google.com" target="_blank" rel="nofollow noreferrer noopener">Google</a> link, <a href="https://facebook.com" target="_blank" rel="nofollow noreferrer noopener">Facebook</a> link, <a href="http://test.example.com/" target="_blank" rel="nofollow noreferrer noopener">Test Example</a> link, <a href="http://test2.example.com/" target="_blank" rel="nofollow noreferrer noopener">Test2 Example</a> link and <a href="/docs/concept/">Relative</a> link.</p>`;
const matchString = new RegExp(expectedOutput);
const testString = 'This is an [Example](http://example.com) link, [Google](https://google.com) link, [Facebook](https://facebook.com) link, [Test Example](http://test.example.com/) link, [Test2 Example](http://test2.example.com/) link and [Relative](/docs/concept/) link.';


md.use(externalLink, {
  hosts: ['http://example.com']
});

const output = md.render(testString)

if (output.match(matchString)) {
  console.log('Single Domain Test Passed.');
} else {
  console.error('Single Domain Test Failed.');
}