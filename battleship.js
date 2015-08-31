$(document).ready(function(){

  /* Stores the board info
    0 for empty
    1 for ship
    X when hit
    - when miss
  */

  var board = [];

  // Stores the locations of the ships
  var ships = [];

  // Current number of ships
  var shipNum = 2;

  // Size of the board
  var boardSize = 10;

  // Bool indicating whether or not game is over
  var gameOver = false;

  // Number of ship hits
  var hits = 0;

  // Number of guesses
  var guesses = 0;

  initializeGame();

  function initializeGame(){
    generateRandomBoard();
    printBoard();
  }

  function generateRandomBoard(){
    // Add some random ships
    var shipsAdded = 0;
    while (shipsAdded < shipNum) {
      var randomVal = Math.floor(Math.random() * (boardSize - 1));
      if (ships.indexOf(randomVal) < 0) { // Not already one of the ships
        ships.push(randomVal);
        shipsAdded++;
      }
    }

    // Set the board values based on ships added
    for(var j = 0; j < boardSize; j++) {
      if (ships.indexOf(j) < 0) { // This location not a ship
        board[j] = 0;   // Empty
      } else {
        board[j] = 1;   // Ship!
      }
    }
  }

  function printBoard() {
    var boardOut = "";
    for(var i = 0; i < boardSize; i++) {
      boardOut += board[i];
    }
    $("#board").text(boardOut);
  }

  function endGame() {
    // TODO: End game
    // ADDED FUN: Disable submit button
    console.log("End game");
    $('#end-game').empty();
  }

  // CLICK HANDLERS
  $("#submit").click(userGuess);
  $("#new-game").click( function() {
    location.reload();
  });

  function userGuess(){
    event.preventDefault();
    console.log(ships);
    // Retrieve the guess from the input box
    var guess = parseInt($("#guess").val());

    // Reset the guess input box
    $('#guess').val('');
    
    // Verify the guess is in a valid range
    if (isNaN(guess) || guess < 0 || guess > 9) {
      alert('Please enter a number from 0 to 9');
    }

    // Check if the guess matches one of our ships locations
    // If it does, mark is as a HIT
    // If it doesn't, mark it as a MISS
    // Redraw the board if it has changed
    var ship1 = ships[0];
    var ship2 = ships[1];

    if (guess == ship1) {
      board[ship1] = "X";
      printBoard();
    } else if (guess == ship2) {
      board[ship2] = "X";
      printBoard();
    } else {
      board[guess] = "-";
      printBoard();
    }

    // Continue gameplay
    // Tell the user how many guesses they've made
    $('#guessNum').remove();
    guesses++;
    var guessNum = $('<span id="guessNum"></span>');
    $('#guess-count').append(guessNum);
    guessNum.append(guesses);


    // NOTE: How does the game end?
    if (board[ship1] == 'X' && board[ship2] == 'X') {
      $('#end-game').append('You win!');
      $('#end-game').append('<button id="new-game">Play again</button>');
    } else if (guesses == 5) {
      $('#end-game').append('Aw, you lose. The ships were at positions ' + ship1 + ' and ' + ship2 + '.');
      $('#end-game').append('<button id="new-game">Play again</button>');
    }
  }
});
