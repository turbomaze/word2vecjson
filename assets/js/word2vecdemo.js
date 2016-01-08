/******************\
|   Word2Vec JSON  |
| @author Anthony  |
| @version 0.1     |
| @date 2016/01/08 |
| @edit 2016/01/08 |
\******************/

var WordToVecDemo = (function() {
  'use strict';

  /**********
   * config */
  var NUM_SIMS_TO_SHOW = 1000;

  /*************
   * constants */
  var WORDS = Object.keys(wordVecs);

  /*********************
   * working variables */

  /******************
   * work functions */
  function initWordToVecDemo() {
    //compare a bunch of words randomly
    var sims = [];
    for (var ai = 0; ai < NUM_SIMS_TO_SHOW; ai++) {
      var idx1 = Math.floor(WORDS.length*Math.random());
      var idx2 = Math.floor(WORDS.length*Math.random());
      var w1 = WORDS[idx1];
      var w2 = WORDS[idx2];
      var sim = getCosSim(wordVecs[w1], wordVecs[w2]);
      sims.push([w1, w2, sim]);
    }
    sims.sort(function(a, b) {
      return b[2] - a[2]; 
    });

    //render the comparisons
    sims.forEach(function(sim) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>'+sim[0]+'</td>';
      tr.innerHTML += '<td>'+sim[1]+'</td>';
      tr.innerHTML += '<td>'+sim[2]+'</td>';
      document.getElementById('cont').appendChild(tr);
    });
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
    return (a.map(function(val, idx) {
      return val + b[idx]; 
    }));
  }

  function subVecs(a, b) {
    return (a.map(function(val, idx) {
      return val - b[idx]; 
    }));
  }

  return {
    init: initWordToVecDemo,
    addVecs: addVecs,
    subVecs: subVecs,
    getNClosestMatches: getNClosestMatches,
    getCosSim: getCosSim
  };
})();
    
window.addEventListener('load', WordToVecDemo.init);

