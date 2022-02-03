# remarkable-external-link

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![AppVeyor Build Status][appveyor-image]][appveyor-url]

[Remarkable](https://www.npmjs.com/package/remarkable) plugin adds `target` and `rel` attributes on external links plus supports insertion of text before and after each link.

## Install

Via `npm`

```bash
npm install remarkable-external-link --save-dev
```

Via Yarn

```bash
yarn add remarkable-external-link --dev
```

## Usage

```javascript
const { Remarkable } = require('remarkable');
const remarkableExternalLink = require('remarkable-external-link').default;
const md = new Remarkable();

const testString = 'This is an [Example](http://example.com) link, [Google](https://google.com) link, [Facebook](https://facebook.com) link, [Test Example](http://test.example.com/) link, [Test2 Example](http://test2.example.com/) link and [Relative](/docs/concept/) link.';

// Mark http://example.com and http://test.example.com as internal domain.
md.use(remarkableExternalLink, {
  'hosts': [
    'http://example.com',
    'http://test.example.com'
  ]
});

const output = console.log(md.render(testString));
```

Or With Docusaurus:

```javascript
const remarkableExternalLink = require('remarkable-external-link').default;
const siteConfig = {
  ...

  markdownPlugins: [
    function (md) {
      remarkableExternalLink(md, {
        'hosts': [
          'http://example.com',
          'http://test.example.com'
        ]
      });
    }
  ]

  ...
}
```

Or with text insertions...

```javascript
md.use(remarkableExternalLink, {
  'preOutside': '[',
  'preInside': '-=',
  'postInside': '=-',
  'postOutside': '] (ext)',
});


const testString = 'This is an [Example](http://example.com) link';
console.log(md.render(testString));

// Expect
// '<p>This is a [<a href="http://example.com">-= link =-</a>] <sub>(ext)</sub> in markdown.</p>\n'
```

which will change the HTML display from

> <p>This is a <a href="http://example.com">link</a> in markdown.</p>

to

> <p>This is a [<a href="http://example.com">-= link =-</a>] (ext) in markdown.</p>



## Parameters

| Attributes  |  Type  | Required |             Default            | Description                                                                      |
|:-----------:|:------:|:--------:|:------------------------------:|----------------------------------------------------------------------------------|
|    hosts    |  Array |    No    |              []                | Site hostname(s) to detect external links.                                       |
|    host     | String |    No    |              null              | Single site hostname( to detect external links (ignored if hosts is provided)    |
|   target    | String |    No    |            `_blank`            | Specifies where to open the linked document.                                     |
|     rel     | String |    No    | `nofollow noreferrer noopener` | Specifies the relationship between the current document and the linked document. |
| textExtOnly | String |    No    |              true              | Prepend / append text only to external links.                                    |
|  preOutside | String |    No    |              null              | Specifies HTML to be inserted before an external link.                           |
|  preInside  | String |    No    |              null              | Specifies HTML to be inserted at the start of the text within an external link.  |
|  postInside | String |    No    |              null              | Specifies HTML to be inserted at the end of the text within an external link.    |
| postOutside | String |    No    |              null              | Specifies HTML to be inserted after an external link.                            |

[npm-image]: https://img.shields.io/npm/v/remarkable-external-link.svg
[npm-url]: https://www.npmjs.com/package/remarkable-external-link
[downloads-image]: https://img.shields.io/npm/dm/remarkable-external-link.svg

[travis-image]: https://travis-ci.org/samiahmedsiddiqui/remarkable-external-link.svg?branch=master
[travis-url]: https://travis-ci.org/github/samiahmedsiddiqui/remarkable-external-link

[appveyor-url]: https://ci.appveyor.com/project/samiahmedsiddiqui/remarkable-external-link
[appveyor-image]: https://img.shields.io/appveyor/ci/samiahmedsiddiqui/remarkable-external-link.svg?label=appveyor
