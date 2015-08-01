(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.retextLancasterStemmer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module retext:lancaster-stemmer
 * @fileoverview Retext implementation of the Lancaster stemming algorithm.
 */

'use strict';

/*
 * Dependencies.
 */

var stemmer = require('lancaster-stemmer');
var visit = require('unist-util-visit');
var nlcstToString = require('nlcst-to-string');

/**
 * Patch a `stem` property on `node` (a word-node).
 *
 * @param {NLCSTWordNode} node - Node.
 */
function patch(node) {
    var data = node.data || {};

    data.stem = stemmer(nlcstToString(node));

    node.data = data;
}

/**
 * Transformer.
 *
 * @param {NLCSTNode} cst - Syntax tree.
 */
function transformer(cst) {
    visit(cst, 'WordNode', patch);
}

/**
 * Attacher.
 *
 * @return {Function} - `transformer`.
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;

},{"lancaster-stemmer":2,"nlcst-to-string":3,"unist-util-visit":4}],2:[function(require,module,exports){
'use strict';

var STOP,
    INTACT,
    CONTINUE,
    PROTECT,
    rules,
    EXPRESSION_VOWELS;

/*
 * Constants.
 */

STOP = -1;
INTACT = 0;
CONTINUE = 1;
PROTECT = 2;
EXPRESSION_VOWELS = /[aeiouy]/;

/*
 * Rules.
 */

rules = {
    'a': [
        {
            'match': 'ia',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 'a',
            'replacement': '',
            'type': INTACT
        }
    ],
    'b': [
        {
            'match': 'bb',
            'replacement': 'b',
            'type': STOP
        }
    ],
    'c': [
        {
            'match': 'ytic',
            'replacement': 'ys',
            'type': STOP
        },
        {
            'match': 'ic',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'nc',
            'replacement': 'nt',
            'type': CONTINUE
        }
    ],
    'd': [
        {
            'match': 'dd',
            'replacement': 'd',
            'type': STOP
        },
        {
            'match': 'ied',
            'replacement': 'y',
            'type': CONTINUE
        },
        {
            'match': 'ceed',
            'replacement': 'cess',
            'type': STOP
        },
        {
            'match': 'eed',
            'replacement': 'ee',
            'type': STOP
        },
        {
            'match': 'ed',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'hood',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'e': [
        {
            'match': 'e',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'f': [
        {
            'match': 'lief',
            'replacement': 'liev',
            'type': STOP
        },
        {
            'match': 'if',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'g': [
        {
            'match': 'ing',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'iag',
            'replacement': 'y',
            'type': STOP
        },
        {
            'match': 'ag',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'gg',
            'replacement': 'g',
            'type': STOP
        }
    ],
    'h': [
        {
            'match': 'th',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 'guish',
            'replacement': 'ct',
            'type': STOP
        },
        {
            'match': 'ish',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'i': [
        {
            'match': 'i',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 'i',
            'replacement': 'y',
            'type': CONTINUE
        }
    ],
    'j': [
        {
            'match': 'ij',
            'replacement': 'id',
            'type': STOP
        },
        {
            'match': 'fuj',
            'replacement': 'fus',
            'type': STOP
        },
        {
            'match': 'uj',
            'replacement': 'ud',
            'type': STOP
        },
        {
            'match': 'oj',
            'replacement': 'od',
            'type': STOP
        },
        {
            'match': 'hej',
            'replacement': 'her',
            'type': STOP
        },
        {
            'match': 'verj',
            'replacement': 'vert',
            'type': STOP
        },
        {
            'match': 'misj',
            'replacement': 'mit',
            'type': STOP
        },
        {
            'match': 'nj',
            'replacement': 'nd',
            'type': STOP
        },
        {
            'match': 'j',
            'replacement': 's',
            'type': STOP
        }
    ],
    'l': [
        {
            'match': 'ifiabl',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'iabl',
            'replacement': 'y',
            'type': STOP
        },
        {
            'match': 'abl',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ibl',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'bil',
            'replacement': 'bl',
            'type': CONTINUE
        },
        {
            'match': 'cl',
            'replacement': 'c',
            'type': STOP
        },
        {
            'match': 'iful',
            'replacement': 'y',
            'type': STOP
        },
        {
            'match': 'ful',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ul',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ial',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ual',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'al',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'll',
            'replacement': 'l',
            'type': STOP
        }
    ],
    'm': [
        {
            'match': 'ium',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'um',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 'ism',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'mm',
            'replacement': 'm',
            'type': STOP
        }
    ],
    'n': [
        {
            'match': 'sion',
            'replacement': 'j',
            'type': CONTINUE
        },
        {
            'match': 'xion',
            'replacement': 'ct',
            'type': STOP
        },
        {
            'match': 'ion',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ian',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'an',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'een',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'en',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'nn',
            'replacement': 'n',
            'type': STOP
        }
    ],
    'p': [
        {
            'match': 'ship',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'pp',
            'replacement': 'p',
            'type': STOP
        }
    ],
    'r': [
        {
            'match': 'er',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ear',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'ar',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ior',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'or',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ur',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'rr',
            'replacement': 'r',
            'type': STOP
        },
        {
            'match': 'tr',
            'replacement': 't',
            'type': CONTINUE
        },
        {
            'match': 'ier',
            'replacement': 'y',
            'type': CONTINUE
        }
    ],
    's': [
        {
            'match': 'ies',
            'replacement': 'y',
            'type': CONTINUE
        },
        {
            'match': 'sis',
            'replacement': 's',
            'type': STOP
        },
        {
            'match': 'is',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ness',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ss',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'ous',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'us',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 's',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 's',
            'replacement': '',
            'type': STOP
        }
    ],
    't': [
        {
            'match': 'plicat',
            'replacement': 'ply',
            'type': STOP
        },
        {
            'match': 'at',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ment',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ent',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ant',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ript',
            'replacement': 'rib',
            'type': STOP
        },
        {
            'match': 'orpt',
            'replacement': 'orb',
            'type': STOP
        },
        {
            'match': 'duct',
            'replacement': 'duc',
            'type': STOP
        },
        {
            'match': 'sumpt',
            'replacement': 'sum',
            'type': STOP
        },
        {
            'match': 'cept',
            'replacement': 'ceiv',
            'type': STOP
        },
        {
            'match': 'olut',
            'replacement': 'olv',
            'type': STOP
        },
        {
            'match': 'sist',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'ist',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'tt',
            'replacement': 't',
            'type': STOP
        }
    ],
    'u': [
        {
            'match': 'iqu',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ogu',
            'replacement': 'og',
            'type': STOP
        }
    ],
    'v': [
        {
            'match': 'siv',
            'replacement': 'j',
            'type': CONTINUE
        },
        {
            'match': 'eiv',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'iv',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'y': [
        {
            'match': 'bly',
            'replacement': 'bl',
            'type': CONTINUE
        },
        {
            'match': 'ily',
            'replacement': 'y',
            'type': CONTINUE
        },
        {
            'match': 'ply',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'ly',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ogy',
            'replacement': 'og',
            'type': STOP
        },
        {
            'match': 'phy',
            'replacement': 'ph',
            'type': STOP
        },
        {
            'match': 'omy',
            'replacement': 'om',
            'type': STOP
        },
        {
            'match': 'opy',
            'replacement': 'op',
            'type': STOP
        },
        {
            'match': 'ity',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ety',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'lty',
            'replacement': 'l',
            'type': STOP
        },
        {
            'match': 'istry',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ary',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ory',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ify',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ncy',
            'replacement': 'nt',
            'type': CONTINUE
        },
        {
            'match': 'acy',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'z': [
        {
            'match': 'iz',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'yz',
            'replacement': 'ys',
            'type': STOP
        }
    ]
};

/**
 * Detect if a value is acceptable to return, or should
 * be stemmed further.
 *
 * @param {string} value - Input.
 * @return {boolean} Whether the input is acceptable.
 */
function isAcceptable(value) {
    return EXPRESSION_VOWELS.test(value.charAt(0)) ?
        value.length > 1 :
        value.length > 2 && EXPRESSION_VOWELS.test(value);
}

/**
 * Apply rules to a value.
 *
 * @param {string} value - Value to stem.
 * @param {boolean} isIntact - Whether the input is unchanged.
 * @return {string} stem according to Lancaster.
 */
function applyRules(value, isIntact) {
    var ruleset,
        index,
        length,
        rule,
        next,
        breakpoint;

    ruleset = rules[value.charAt(value.length - 1)];

    if (!ruleset) {
        return value;
    }

    index = -1;
    length = ruleset.length;

    while (++index < length) {
        rule = ruleset[index];

        if (!isIntact && rule.type === INTACT) {
            continue;
        }

        breakpoint = value.length - rule.match.length;

        if (
            breakpoint < 0 ||
            value.substr(breakpoint) !== rule.match
        ) {
            continue;
        }

        if (rule.type === PROTECT) {
            return value;
        }

        next = value.substr(0, breakpoint) + rule.replacement;

        if (!isAcceptable(next)) {
            continue;
        }

        if (rule.type === CONTINUE) {
            return applyRules(next, false);
        }

        return next;
    }

    return value;
}

/**
 * Stem a value.
 *
 * @param {string} value - Value to stem.
 * @return {string} stem according to Lancaster.
 */
function lancasterStemmer(value) {
    return applyRules(String(value).toLowerCase(), true);
}

/*
 * Expose `lancasterStemmer`.
 */

module.exports = lancasterStemmer;

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Stringify an NLCST node.
 *
 * @param {NLCSTNode} nlcst
 * @return {string}
 */
function nlcstToString(nlcst) {
    var values,
        length,
        children;

    if (typeof nlcst.value === 'string') {
        return nlcst.value;
    }

    children = nlcst.children;
    length = children.length;

    /**
     * Shortcut: This is pretty common, and a small performance win.
     */

    if (length === 1 && 'value' in children[0]) {
        return children[0].value;
    }

    values = [];

    while (length--) {
        values[length] = nlcstToString(children[length]);
    }

    return values.join('');
}

/*
 * Expose `nlcstToString`.
 */

module.exports = nlcstToString;

},{}],4:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module unist:util:visit
 * @fileoverview Utility to recursively walk over unist nodes.
 */

'use strict';

/**
 * Walk forwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   forwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function forwards(values, callback) {
    var index = -1;
    var length = values.length;

    while (++index < length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Walk backwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   backwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function backwards(values, callback) {
    var index = values.length;
    var length = -1;

    while (--index > length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Visit.
 *
 * @param {Node} tree - Root node
 * @param {string} [type] - Node type.
 * @param {function(node): boolean?} callback - Invoked
 *   with each found node.  Can return `false` to stop.
 * @param {boolean} [reverse] - By default, `visit` will
 *   walk forwards, when `reverse` is `true`, `visit`
 *   walks backwards.
 */
function visit(tree, type, callback, reverse) {
    var iterate;
    var one;
    var all;

    if (typeof type === 'function') {
        reverse = callback;
        callback = type;
        type = null;
    }

    iterate = reverse ? backwards : forwards;

    /**
     * Visit `children` in `parent`.
     */
    all = function (children, parent) {
        return iterate(children, function (child, index) {
            return child && one(child, index, parent);
        });
    };

    /**
     * Visit a single node.
     */
    one = function (node, index, parent) {
        var result;

        index = index || (parent ? 0 : null);

        if (!type || node.type === type) {
            result = callback(node, index, parent || null);
        }

        if (node.children && result !== false) {
            return all(node.children, node);
        }

        return result;
    };

    one(tree);
}

/*
 * Expose.
 */

module.exports = visit;

},{}]},{},[1])(1)
});