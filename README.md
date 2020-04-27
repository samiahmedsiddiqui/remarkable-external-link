# remarkable-external-link

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

[Remarkable](https://www.npmjs.com/package/remarkable) plugin adds `target` and `rel` attributes on external links.

## Install

Via `npm`
```bash
npm install remarkable-external-link
```

Via Yarn
```bash
yarn add remarkable-external-link
```

## Usage

```javascript
const Remarkable = require('remarkable');
const externalLink = require('remarkable-external-link');
const md = new Remarkable();
 
md.use(externalLink, {
    host: 'example.com'
});
```

Or With Docusaurus:
```
const externalLink = require('remarkable-external-link');
const siteConfig = {
  ...

  markdownPlugins: [
    function (md) {
      externalLink(md, {
        host: 'example.com'
      });
    }
  ]
  
  ...
}
```

## Parameters

| Attributes |  Type  | Required |             Default            | Description                                                                      |
|------------|:------:|:--------:|:------------------------------:|----------------------------------------------------------------------------------|
| host       | String |    Yes   |                                | Site hostname to detect external links.                                          |
| target     | String |    No    |            `_blank`            | Specifies where to open the linked document.                                     |
| rel        | String |    No    | `nofollow noreferrer noopener` | Specifies the relationship between the current document and the linked document. |

[npm-image]: https://img.shields.io/npm/v/remarkable-external-link.svg
[npm-url]: https://www.npmjs.com/package/remarkable-external-link
[downloads-image]: https://img.shields.io/npm/dm/remarkable-external-link.svg
