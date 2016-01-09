Word2Vec JSON
==================

[Word2vec](https://code.google.com/p/word2vec/) represents words as vectors whose components encompass what the words mean. Algebraic operations on those vectors, like "king" - "man" + "woman", yield intuitively correct results, like "queen". This project provides the word vectors for the 1000, 5000, 10000, and 25000 most common English words in JSON.

Demo at http://turbomaze.github.io/word2vecjson/.

## Usage
To use these vectors in a project, include the `data/wordvecs10000.js` file and you're set. It's a JS object whose keys are words and values are word vectors (arrays of doubles). Included in this project is a script (`assets/js/word2vecutils.js`) with some common utility functions for playing around with word vectors.

## License
MIT License: http://igliu.mit-license.org/
