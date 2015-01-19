# retext-lancaster-stemmer [![Build Status](https://img.shields.io/travis/wooorm/retext-lancaster-stemmer.svg?style=flat)](https://travis-ci.org/wooorm/retext-lancaster-stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-lancaster-stemmer.svg?style=flat)](https://coveralls.io/r/wooorm/retext-lancaster-stemmer?branch=master)

**[retext](https://github.com/wooorm/retext)** implementation of the [Lancaster (Paice/Husk) stemming algorithm](http://www.comp.lancs.ac.uk/computing/research/stemming/index.htm).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
$ npm install retext-lancaster-stemmer
```

[Component.js](https://github.com/componentjs/component):

```bash
$ component install wooorm/retext-lancaster-stemmer
```

[Bower](http://bower.io/#install-packages):

```bash
$ bower install retext-lancaster-stemmer
```

[Duo](http://duojs.org/#getting-started):

```javascript
var lancasterStemmer = require('wooorm/retext-lancaster-stemmer');
```

## Usage

```javascript
var Retext = require('retext');
var inspect = require('retext-inspect');
var visit = require('retext-visit');
var lancasterStemmer = require('retext-lancaster-stemmer');

var retext = new Retext()
    .use(inspect)
    .use(visit)
    .use(lancasterStemmer)

retext.parse('A simple English sentence.', function (err, tree) {
    tree.visit(tree.WORD_NODE, function (node) {
        console.log(node);
    });
    /**
     * WordNode[1] [data={"stem":"a"}]
     * └─ TextNode: 'A'
     * WordNode[1] [data={"stem":"simpl"}]
     * └─ TextNode: 'simple'
     * WordNode[1] [data={"stem":"engl"}]
     * └─ TextNode: 'English'
     * WordNode[1] [data={"stem":"sent"}]
     * └─ TextNode: 'sentence'
     */
});
```

## API

None, **retext-lancaster-stemmer** automatically detects the stem of each [`WordNode`](https://github.com/wooorm/textom#textomwordnode-nlcstwordnode) (using **[wooorm/stemmer](https://github.com/wooorm/lancaster-stemmer)**), and stores the stem in `node.data.stem`.

## Performance

On a MacBook Air, **retext** performs about 13% slower with **retext-lancaster-stemmer**.

```text
           retext w/o retext-lancaster-stemmer
  225 op/s » A paragraph (5 sentences, 100 words)
   25 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)

           retext w/ retext-lancaster-stemmer
  195 op/s » A paragraph (5 sentences, 100 words)
   20 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)
```

## Related

- [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer) — Same workings, but using the Porter stemming algorithm.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
