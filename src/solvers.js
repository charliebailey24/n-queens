/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// high-level: we need to build a tree with all possible legal states of piece position

// get a new board

// 1. add to the children array of the root node another node with a piece in the first position on the board
// 2. add to the children array of the root node another node with a piece in the second position on the board
// 3. repeat this pattern until all possible first move states of the board have been added to the root node children array

// for each child node at the 1st layer in the tree
  // 1. add to the children array of the first node another node with a rook in the next open position on the board
  // 2. add to the children array of the first node another node with a rook in the next open position on the board
  // 3. repeat this pattern until all possible second move states of the board have been added to the 2nd layer of the tree
  // after all nodes with possible open moves have been added to the children array
    // iterate over this nodes children array
      // check if the current node has a legal board state based on piece attacking rules (will need to call the helper function methods here)
        // if false, delete the node

// repeat



// SECOND PASS
// initial state is root of the tree (empty n x n matrix)
// need to check if this state is the goal state
// if it is not the goal state
  // expand the current state by adding nodes to the children array of...


