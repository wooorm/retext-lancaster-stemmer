# retext-lancaster-stemmer [![Build Status](https://img.shields.io/travis/wooorm/retext-lancaster-stemmer.svg?style=flat)](https://travis-ci.org/wooorm/retext-lancaster-stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-lancaster-stemmer.svg?style=flat)](https://coveralls.io/r/wooorm/retext-lancaster-stemmer?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** implementation of the [Lancaster (Paice/Husk) stemming algorithm](http://www.comp.lancs.ac.uk/computing/research/stemming/index.htm).

## Installation

npm:
```sh
$ npm install retext-lancaster-stemmer
```

Component:
```sh
$ component install wooorm/retext-lancaster-stemmer
```

Bower:
```sh
$ bower install retext-lancaster-stemmer
```

## Usage

```js
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

None, the plugin automatically stems each word (using [wooorm/lancaster-stemmer](https://github.com/wooorm/lancaster-stemmer)), and stores the stem in `wordNode.data.stem`.

## Related

- [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer) — Same workings, but using the Porter stemming algorithm.

## License

MIT © [Titus Wormer](http://wooorm.com)
