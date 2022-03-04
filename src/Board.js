// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var board = this;
      var counter = 0;
      var row = board.get(rowIndex);

      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this;
      var n = board.attributes.n;

      for (var i = 0; i < n; i ++) {

        if (board.hasRowConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this;
      var matrix = board.rows();

      var counter = 0;
      for (var i = 0; i < matrix.length; i ++) {
        if (matrix[i][colIndex] === 1) {
          counter++;
          if (counter > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this;
      var n = board.attributes.n;

      for (var i = 0; i < n; i++) {
        if (board.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },


    // FOR QUEENS ONLY
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(colIndex) {
      // original param name: majorDiagonalColumnIndexAtFirstRow
      //input? --- number --- 0-(n-1)
      //var MajorDiagonalColumnIndexAtFirstRow==mejorcolnum
      // metrix row +1 -1 , metrix row=1. column +1
      //get metrix =borad.row();


      // input: the i that we are iterating over in hasAnyMajorDiagonalConflicts



      var board = this;
      var matrix = board.rows();
      // var rowIndex = 0;
      var n = board.attributes.n;
      var counter = 0;
      // check

      // _getFirstRowColumnIndexForMajorDiagonalOn
      // colIndex in between (-(n-1))--->(n-1)
      for (var i = 0; i < n; i ++) { //i == 1, x=1
        // check if i is in bounds
        if ( board._isInBounds(i, (colIndex + i))) {
          if ( matrix[0 + i][colIndex + i] === 1) {
            counter ++;
            if (counter > 1) {
              return true;
            }
          }
        }
      }

      return false;

      // console.log('majorDiagonalColumnIndexAtFirstRow: ', majorDiagonalColumnIndexAtFirstRow);

      // iterate over 1->n ,
      //if metrix[0+i][mejorcolum+i] === 1 or not

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // iterate over (-(n-2)) to (n-2)---> i will be the input of the hasMajorDiagonalConflictAt

      // want to iterate over all of the major diagonals
      // calling hasMajorDiagonalConflictAt in this function

      var board = this;
      var n = board.attributes.n;
      var i = (-(n - 2));

      while (i <= (n - 2) ) {
        if (board.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
        i++;
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(colIndex) {

      var board = this;
      var matrix = board.rows();
      var n = board.attributes.n;
      var counter = 0;
      // colIndex = 1;
      // n = 3

      for (var i = 0; i < n; i ++) {
        // i = 3 []
        // i = 2 []
        // i = 1 []
        // i = 0 []
        if ( board._isInBounds( i, (colIndex - i))) { //checking the postion that we will look at is on the board, row index always starting at 0,
          if ( matrix[0 + i][colIndex - i] === 1) {
            counter ++;
            if (counter > 1) {
              return true;
            }
          }
        }
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this;
      var n = board.attributes.n;
      var i = 1;
      // n = 3

      while (i <= (n + 2) ) {
        if (board.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
        i++;
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
