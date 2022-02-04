# remarkable-external-link

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
<!-- [![Build Status][travis-image]][travis-url] -->
[![AppVeyor Build Status][appveyor-image]][appveyor-url]

[Remarkable](https://www.npmjs.com/package/remarkable) plugin that adds `target` and `rel` attributes on external links. It also provides ability to insert Text/HTML inside and/or outside a link for external links or for all the links (including external) depending on your configuration.

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

Or with text insertion:

```javascript
md.use(remarkableExternalLink, {
  'beforeLink': '[',
  'beforeLinkText': '-=',
  'afterLinkText': '=-',
  'afterLink': '] (ext)',
});


const testString = 'This is an [Example](http://example.com) link.';
console.log(md.render(testString));
```

Above code will change the HTML display from

```html
<p>This is an [<a href="http://example.com">-= Example =-</a>] (ext) link.</p>
```

to

```html
<p>This is an [<a href="http://example.com">-= Example =-</a>] (ext) link.</p>
```

## Parameters

|   Attributes   |  Type  | Required |   Default  |                                    Description                                   |
|:--------------:|:------:|:--------:|:----------:|:--------------------------------------------------------------------------------:|
|      hosts     |  Array |    Yes   |     []     | Site hostname(s) to detect external links.                                       |
|     target     | String |    No    |  `_blank`  | Specifies where to open the linked document.                                     |
|       rel      | String |    No    | `noopener` | Specifies the relationship between the current document and the linked document. |
|  externalOnly  | String |    No    |    true    | Prepend / append text only to external links.                                    |
|   beforeLink   | String |    No    |    null    | Specifies Text / HTML to be inserted before a link.                              |
| beforeLinkText | String |    No    |    null    | Specifies Text / HTML to be inserted at the start of the text within a link.     |
|  afterLinkText | String |    No    |    null    | Specifies Text / HTML to be inserted at the end of the text within a link.       |
|    afterLink   | String |    No    |    null    | Specifies Text / HTML to be inserted after a link.                               |

[npm-image]: https://img.shields.io/npm/v/remarkable-external-link.svg
[npm-url]: https://www.npmjs.com/package/remarkable-external-link
[downloads-image]: https://img.shields.io/npm/dm/remarkable-external-link.svg

<!-- [travis-image]: https://travis-ci.org/samiahmedsiddiqui/remarkable-external-link.svg?branch=master
[travis-url]: https://travis-ci.org/github/samiahmedsiddiqui/remarkable-external-link -->

[appveyor-url]: https://ci.appveyor.com/project/samiahmedsiddiqui/remarkable-external-link
[appveyor-image]: https://img.shields.io/appveyor/ci/samiahmedsiddiqui/remarkable-external-link.svg?label=appveyor
