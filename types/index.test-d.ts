'use strict';

import { Remarkable } from 'remarkable';
import remarkableExternalLink from './index';

const testString = `This is an [Example](http://example.com) link, [Google](https://google.com) link, [Facebook](https://facebook.com) link, [Test Example](http://test.example.com/) link, [Test2 Example](http://test2.example.com/) link and [Relative](/docs/concept/) link.`;

const md = new Remarkable();
const multipleHosts = {
  'hosts': [
    'http://example.com',
    'http://test.example.com'
  ]
};
const singleHost = {
  'hosts': ['http://example.com']
};

const insertText = {
  'textExtOnly': false,
  'preOutside': '[',
  'preInside': '-= ',
  'postInside': ' =-',
  'postOutside': '] (ext)',
};

if (singleHost) {
  md.use(remarkableExternalLink, singleHost);
  md.render(testString);
}

if (multipleHosts) {
  md.use(remarkableExternalLink, multipleHosts);
  md.render(testString);
}

if (insertText) {
  md.use(remarkableExternalLink, insertText);
  md.render(testString);
}
