/******************\
|  Word2Vec Utils  |
| @author Anthony  |
| @version 0.2.1   |
| @date 2016/01/08 |
| @edit 2016/01/08 |
\******************/

var Word2VecUtils = (function() {
  'use strict';

  /**********
   * config */

  /*************
   * constants */
  var WORDS = Object.keys(wordVecs);

  /*********************
   * working variables */

  /******************
   * work functions */
  function diffN(n, word1, word2) {
    for (var ai = 1; ai < arguments.length; ai++) {
      if (!wordVecs.hasOwnProperty(arguments[ai])) {
        return [false, arguments[ai]];
      }
    }

    return getNClosestMatches(
      n,
      subVecs(wordVecs[word1], wordVecs[word2])
    ); 
  }

  function composeN(n, word1, word2) {
    for (var ai = 1; ai < arguments.length; ai++) {
      if (!wordVecs.hasOwnProperty(arguments[ai])) {
        return [false, arguments[ai]];
      }
    }

    return getNClosestMatches(
      n,
      addVecs(wordVecs[word1], wordVecs[word2])
    ); 
  }

  function mixAndMatchN(n, sub1, sub2, add1) {
    for (var ai = 1; ai < arguments.length; ai++) {
      if (!wordVecs.hasOwnProperty(arguments[ai])) {
        return [false, arguments[ai]];
      }
    }

    return getNClosestMatches(
      n,
      addVecs(wordVecs[add1], subVecs(wordVecs[sub1], wordVecs[sub2]))
    ); 
  }

  function findSimilarWords(n, word) {
    if (!wordVecs.hasOwnProperty(word)) {
      return [false, word];
    }

    return getNClosestMatches(
      n, wordVecs[word]
    );
  }

  function getNClosestMatches(n, vec) {
    var sims = [];
    for (var word in wordVecs) {
      var sim = getCosSim(vec, wordVecs[word]);
      sims.push([word, sim]);
    }
    sims.sort(function(a, b) {
      return b[1] - a[1]; 
    });
    return sims.slice(0, n);
  }

  /********************
   * helper functions */
  function getCosSim(f1, f2) {
    return Math.abs(f1.reduce(function(sum, a, idx) {
      return sum + a*f2[idx];
    }, 0)/(mag(f1)*mag(f2))); //magnitude is 1 for all feature vectors
  }

  function mag(a) {
    return Math.sqrt(a.reduce(function(sum, val) {
      return sum + val*val;  
    }, 0));
  }

  function norm(a) {
    var mag = mag(a);
    return a.map(function(val) {
      return val/mag; 
    });
  }

  function addVecs(a, b) {
    return a.map(function(val, idx) {
      return val + b[idx]; 
    });
  }

  function subVecs(a, b) {
    return a.map(function(val, idx) {
      return val - b[idx]; 
    });
  }

  return {
    diffN: diffN,
    composeN: composeN,
    findSimilarWords: findSimilarWords,
    mixAndMatchN: mixAndMatchN,
    addVecs: addVecs,
    subVecs: subVecs,
    getNClosestMatches: getNClosestMatches,
    getCosSim: getCosSim
  };
})();
