# remarkable-external-link

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

[Remarkable](https://www.npmjs.com/package/remarkable) plugin adds `target` and `rel` attributes on external links.

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
const externalLink = require('../index');
const md = new Remarkable();

const testString = 'This is an [Example](http://example.com) link, [Google](https://google.com) link, [Facebook](https://facebook.com) link, [Test Example](http://test.example.com/) link, [Test2 Example](http://test2.example.com/) link and [Relative](/docs/concept/) link.';

// Mark http://example.com and http://test.example.com as internal domain.
md.use(externalLink, {
  hosts: ['http://example.com', 'http://test.example.com']
});

const output = console.log(md.render(testString));
```

Or With Docusaurus:

```javascript
const externalLink = require('remarkable-external-link');
const siteConfig = {
  ...

  markdownPlugins: [
    function (md) {
      externalLink(md, {
        hosts: ['http://example.com', 'http://test.example.com']
      });
    }
  ]

  ...
}
```

## Parameters

| Attributes |  Type  | Required |             Default            |                                                     Description                                                    |
|:----------:|:------:|:--------:|:------------------------------:|:------------------------------------------------------------------------------------------------------------------:|
|    hosts   |  Array |    Yes   |                                | Site hostname to detect external links.<br><br>You can add a single domain as well as list of domains(subdomains). |
|    host    | String |    Yes   |                                | **Deprecated**.<br><br>Site hostname to detect external links.                                                         |
|   target   | String |    No    |            `_blank`            | Specifies where to open the linked document.                                                                       |
|     rel    | String |    No    | `nofollow noreferrer noopener` | Specifies the relationship between the current document and the linked document.                                   |

[npm-image]: https://img.shields.io/npm/v/remarkable-external-link.svg
[npm-url]: https://www.npmjs.com/package/remarkable-external-link
[downloads-image]: https://img.shields.io/npm/dm/remarkable-external-link.svg
[travis-image]: https://api.travis-ci.org/samiahmedsiddiqui/remarkable-external-link.svg?branch=master
[travis-url]: https://travis-ci.org/samiahmedsiddiqui/remarkable-external-link
