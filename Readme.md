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
var Retext = require('retext'),
    visit = require('retext-visit'),
    lancasterStemmer = require('retext-lancaster-stemmer'),
    retext;

retext = new Retext()
    .use(visit)
    .use(lancasterStemmer)

retext.parse('A simple English sentence.', function (err, tree) {
    tree.visitType(root.WORD_NODE, function (node) {
        console.log(node.toString(), node.data.stem);
    });
    /**
     * 'A', 'A'
     * 'simple', 'simpl'
     * 'English', 'english'
     * 'sentence', 'sentenc'
     */
});
```

This example also uses [retext-visit](https://github.com/wooorm/retext-visit).

## API

None, the plugin automatically stems each word (using [wooorm/lancaster-stemmer](https://github.com/wooorm/lancaster-stemmer)) when it’s created or changed, and stores the stem in `wordNode.data.stem`.

## Related

- [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer) — Same workings, but using the Porter stemming algorithm.

## License

MIT © Titus Wormer
