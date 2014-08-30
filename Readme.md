# retext-lancaster-stemmer [![Build Status](https://travis-ci.org/wooorm/retext-lancaster-stemmer.svg?branch=master)](https://travis-ci.org/wooorm/retext-lancaster-stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-lancaster-stemmer.svg)](https://coveralls.io/r/wooorm/retext-lancaster-stemmer?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** implementation of the [Lancaster (Paice/Husk) stemming algorithm](http://www.comp.lancs.ac.uk/computing/research/stemming/index.htm).

## Installation

NPM:
```sh
$ npm install retext-lancaster-stemmer
```

Component.js:
```sh
$ component install wooorm/retext-lancaster-stemmer
```

## Usage

```js
var Retext = require('retext'),
    visit = require('retext-visit'),
    stemmer = require('retext-lancaster-stemmer');

var root = new Retext()
    .use(visit)
    .use(stemmer)
    .parse('A simple English sentence.');

root.visitType(root.WORD_NODE, function (node) {
    console.log(node.toString(), node.data.stem);
});
// 'A', 'a'
// 'simple', 'simpl'
// 'english', 'engl'
// 'sentence', 'sent'
```

This example also uses [retext-visit](https://github.com/wooorm/retext-visit).

## API
None, the plugin automatically stems each word (using [wooorm/lancaster-stemmer](https://github.com/wooorm/lancaster-stemmer)) when its created or changed, and stores the stem in `wordNode.data.stem`.

## Related

- [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer) — Same workings, but using the Porter stemming algorithm.

## License

MIT © Titus Wormer
