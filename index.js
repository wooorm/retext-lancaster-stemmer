'use strict';

var stemmer;

/*
 * Module dependencies.
 */

stemmer = require('lancaster-stemmer');

/**
 * `changetextinside` handler;
 *
 * @this Node
 */
function onchangeinside() {
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
    retext.TextOM.WordNode.on('changeinside', onchangeinside);
}

/*
 * Expose `lancasterStemmer`.
 */

module.exports = lancasterStemmer;
