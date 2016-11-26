/******************\
|   Word2Vec JSON  |
| @author Anthony  |
| @version 0.2.1   |
| @date 2016/01/08 |
| @edit 2016/01/08 |
\******************/

var Word2VecDemo = (function() {
  'use strict';

  /**********
   * config */
  var NUM_TO_SHOW = 10;
 
  /*************
   * constants */
  var WORDS = Object.keys(wordVecs);

  /*********************
   * working variables */

  /******************
   * work functions */
  function initWordToVecDemo() {
    $s('#list-sim-btn').addEventListener('click', function() {
      var word = $s('#target-word').value; 
      var simWords = Word2VecUtils.findSimilarWords(NUM_TO_SHOW, word);
      if (simWords[0] === false) {
        $s('#sim-table').innerHTML = 'No vector for that word. Try another.';
      } else {
        renderSimilarities('#sim-table', simWords);
      }
    });

    $s('#solve-eqn-btn').addEventListener('click', function() {
      var word1 = $s('#word-1').value; 
      var word2 = $s('#word-2').value; 
      var word3 = $s('#word-3').value; 
      var answers = word3 === '' ? Word2VecUtils.composeN(
        NUM_TO_SHOW, word1, word2 
      ) : (word1 === '' ? Word2VecUtils.diffN(
        NUM_TO_SHOW, word2, word3
      ) : Word2VecUtils.mixAndMatchN(
        NUM_TO_SHOW, word2, word3, word1
      ));
      if (answers[0] === false) {
        $s('#eqn-table').innerHTML = 'No vector for "'+answers[1]+
          '". Try another word.';
      } else {
        renderSimilarities('#eqn-table', answers);
      }
    });
  }

  function renderSimilarities(id, sims) {
    $s(id).innerHTML = '';
    sims.forEach(function(sim) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>'+sim[0]+'</td>';
      tr.innerHTML += '<td>'+sim[1]+'</td>';
      $s(id).appendChild(tr);
    });
  }

  /********************
   * helper functions */
  function $s(id) { //for convenience
    if (id.charAt(0) !== '#') return false;
    return document.getElementById(id.substring(1));
  }

  return {
    init: initWordToVecDemo
  };
})();
    
window.addEventListener('load', Word2VecDemo.init);
