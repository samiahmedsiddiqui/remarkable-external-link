const { Remarkable } = require('remarkable');
const remarkableExternalLink = require('remarkable-external-link').default;

const md = new Remarkable();

// Test 1 - core
{
  const expectedOutput = '<p>This is an <a href="http://example.com">Example</a> link, <a href="https://google.com" target="_blank" rel="noopener">Google</a> link, <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a> link, <a href="http://test.example.com/">Test Example</a> link, <a href="http://test2.example.com/" target="_blank" rel="noopener">Test2 Example</a> link and <a href="/docs/concept/">Relative</a> link.</p>';
  const matchString = new RegExp(expectedOutput, 'u');
  const testString = 'This is an [Example](http://example.com) link, [Google](https://google.com) link, [Facebook](https://facebook.com) link, [Test Example](http://test.example.com/) link, [Test2 Example](http://test2.example.com/) link and [Relative](/docs/concept/) link.';

  md.use(remarkableExternalLink, {
    'hosts': [
      'http://example.com',
      'http://test.example.com'
    ]
  });

  const output = md.render(testString);
  if (output.match(matchString)) {
    console.log('Domain and subdomains Test Passed.');
  } else {
    console.error('Domain and subdomains Test Failed.');
  }
}


// Test 2 - text insertions
{
  const expectedOutput = '<p>This is an [<a href="http://example.com">-= Example =-</a>] link</p>';
  const matchString = new RegExp(expectedOutput, 'u');
  const testString = 'This is an [Example](http://example.com) link';

  md.use(remarkableExternalLink, {
    'beforeLink': '[',
    'beforeLinkText': '-= ',
    'afterLinkText': ' =-',
    'afterLink': ']',
  });

  const output = md.render(testString);
  if (output.match(matchString)) {
    console.log('Text insertion Test Passed.');
  } else {
    console.error('Text insertion Test Failed.');
  }
}
