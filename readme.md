# retext-lancaster-stemmer [![Build Status](https://img.shields.io/travis/wooorm/retext-lancaster-stemmer.svg)](https://travis-ci.org/wooorm/retext-lancaster-stemmer) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/retext-lancaster-stemmer.svg)](https://codecov.io/github/wooorm/retext-lancaster-stemmer)

[**retext**](https://github.com/wooorm/retext) implementation of the [Lancaster (Paice/Husk) stemming algorithm](http://web.archive.org/web/20140827005744/http://www.comp.lancs.ac.uk/computing/research/stemming/index.htm).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install retext-lancaster-stemmer
```

**retext-lancaster-stemmer** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](retext-lancaster-stemmer.js) and
[compressed](retext-lancaster-stemmer.min.js).

## Usage

```js
var retext = require('retext');
var inspect = require('unist-util-inspect');
var stemmer = require('retext-lancaster-stemmer');

retext().use(stemmer).use(function () {
    return function (cst) {
        console.log(inspect(cst));
    };
}).process('A simple English sentence.');
```

Yields:

```text
RootNode[1]
└─ ParagraphNode[1]
   └─ SentenceNode[8]
      ├─ WordNode[1] [data={"stem":"a"}]
      │  └─ TextNode: 'A'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"stem":"simpl"}]
      │  └─ TextNode: 'simple'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"stem":"engl"}]
      │  └─ TextNode: 'English'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"stem":"sent"}]
      │  └─ TextNode: 'sentence'
      └─ PunctuationNode: '.'
```

## API

None, **retext-lancaster-stemmer** automatically detects the stem of each
[`WordNode`](https://github.com/wooorm/nlcst#wordnode) (using
[**wooorm/lancaster-stemmer**](https://github.com/wooorm/lancaster-stemmer)),
and stores the stem in `node.data.stem`.

## Related

*   [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer)
    — Uses the Porter stemming algorithm.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
