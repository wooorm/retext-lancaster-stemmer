'use strict';

var stemmer;

/**
 * Module dependencies.
 */

stemmer = require('lancaster-stemmer');

/**
 * `changetextinside` handler;
 *
 * @this Node
 */

function onchangetextinside() {
    var value;

    value = this.toString();

    this.data.stem = value ? stemmer(value) : null;
}

/**
 * Define `lancasterStemmer`.
 *
 * @param {Retext} retext - Instance of Retext.
 */

function lancasterStemmer(retext) {
    var WordNode;

    WordNode = retext.parser.TextOM.WordNode;

    WordNode.on('changetextinside', onchangetextinside);
    WordNode.on('removeinside', onchangetextinside);
    WordNode.on('insertinside', onchangetextinside);
}

/**
 * Expose `lancasterStemmer`.
 */

module.exports = lancasterStemmer;
