/*
 * Tic-tac-toe
 * INST 631 - Assignment 1
 * Xiaoyu Tai
 * 08/30/2015
 */

function Game() {
  this.table = new Table();
  this.ui = new UI();
  this.inputs = new Inputs();
  this.start();
}

Game.prototype.start = function() {
  this.ui.start();
  this.ui.update(this.table.cells, null);
};

function Table() {
  this.cells = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
}

Table.prototype.getLetter = function(position) {
  return this.cells[position.x][position.y];
};

Table.prototype.setLetter = function(position, letter) {
  this.cells[position.x][position.y] = letter;
};

Table.prototype.getEmptyCells = function() {
  var r = [];
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      if (cells[i][j] == null) {
        r.push({
          x: i,
          y: j
        });
      }
    };
  };
  return r;
};

function UI() {
  this.option_x = '<div class=\"option-x\">X</div>';
  this.option_o = '<div class=\"option-o\">O</div>';
  this.option_xo = '<div class=\"option-x\" onclick=\"console.log(\'x\')\">X</div> <div class = \"option-o\" onclick=\"console.log(\'o\')\">O</div>'
}

UI.prototype.update = function(cells, next_turn) {
  for (var i = 0; i < cells.length; i++) {
    for (var j = 0; j < cells[i].length; j++) {
      this.updateCell({
        x: i,
        y: j,
        letter: cells[i][j]
      }, next_turn);
    };
  };
};

UI.prototype.updateCell = function(cell, next_turn) {
  if (cell.letter == 'x') {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('empty starter disabled');
    $('#cell-' + cell.x + '-' + cell.y).html(this.option_x);
  } else if (cell.letter == 'y') {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('empty starter disabled');
    $('#cell-' + cell.x + '-' + cell.y).html(this.option_o);
  } else if (cell.letter == null && next_turn == 'x') {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('starter disabled').addClass('empty');
    $('#cell-' + cell.x + '-' + cell.y).html(this.option_x);
  } else if (cell.letter == null && next_turn == 'o') {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('starter disabled').addClass('empty');
    $('#cell-' + cell.x + '-' + cell.y).html(this.option_o);
  } else if (cell.letter == null && next_turn == null) {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('empty disabled').addClass('starter');
    $('#cell-' + cell.x + '-' + cell.y).html(this.option_xo);
  };
};

UI.prototype.start = function() {
  $('body').removeClass();
  $('#header').html('Tic-Tac-Toe');
  $('#header-desc').html('Let\'s start!');
  $('.cell').html();
};

UI.prototype.next = function(next_turn) {
  if (next_turn == 'x') {
    $('#header-desc').html('X\'s turn!');
  } else if (next_turn == 'o') {
    $('#header-desc').html('O\'s turn!');
  };
};

UI.prototype.end = function(player, winning_cells, empty_cells) {
  var restart_btn = '<a class=\"btn btn-default\" href=\"\" id=\"header-restart-btn\"><span class=\"glyphicon glyphicon-repeat\" aria-hidden=\"true\"></span> Start Over</a>'
  for (var i = 0; i < empty_cells.length; i++) {
    $('#cell-' + empty_cells[i].x + '-' + empty_cells[i].y).removeClass('empty starter').addClass('disabled');
  };
  if (player == null) {
    $('body').removeClass().addClass('tie');
    $('#header').html('It\'s a tie!');
    $('header-desc').html(restart_btn);
  } else if (player == 'x') {
    $('body').removeClass().addClass('x-wins');
    $('header-desc').html(restart_btn);
    $('#header-restart-btn').removeClass('btn-default').addClass('btn-primary');
    $('#header').html('X wins!');
    for (var i = 0; i < winning_cells.length; i++) {
      var cell = winning_cells[i];
      $('#cell-' + cell.x + '-' + cell.y).removeClass('empty starter disabled').addClass('x-wins');
    };
  } else if (player == 'o') {
    $('body').removeClass().addClass('o-wins');
    $('#header').html('O wins!');
    $('header-desc').html(restart_btn);
    $('#header-restart-btn').removeClass('btn-default').addClass('btn-adnger');
    for (var i = 0; i < winning_cells.length; i++) {
      var cell = winning_cells[i];
      $('#cell-' + cell.x + '-' + cell.y).removeClass('empty starter disabled').addClass('o-wins');
    };
  };
};

function Inputs() {

}

