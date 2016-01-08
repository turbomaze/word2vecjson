/******************\
|   Word2Vec JSON  |
| @author Anthony  |
| @version 0.1     |
| @date 2016/01/08 |
| @edit 2016/01/08 |
\******************/

var Word2VecDemo = (function() {
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
      var sim = Word2VecUtils.getCosSim(wordVecs[w1], wordVecs[w2]);
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

  /********************
   * helper functions */

  return {
    init: initWordToVecDemo
  };
})();
    
window.addEventListener('load', Word2VecDemo.init);
