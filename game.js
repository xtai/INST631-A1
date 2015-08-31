/*
 * Tic-tac-toe
 * INST 631 - Assignment 1
 * Xiaoyu Tai
 * 08/30/2015
 */

function Game() {
  this.data_storage = new DataStorage();
  this.ui = new UI();
  this.controller = new Controller(this.ui, this.data_storage);
  this.on();
}

Game.prototype.on = function() {
  this.ui.init();
  this.ui.updateAll(this.data_storage.cells, null);
  this.controller.monitor(function(cell, ui, data_storage, controller) {
    // console.log(cell);
    if (cell.letter == 'x') {
      var next_turn = 'o';
    } else {
      var next_turn = 'x';
    }
    data_storage.cells[cell.x][cell.y] = cell.letter;
    ui.updateAll(data_storage.cells, next_turn);
    ui.next(next_turn);
    console.log('update: ' + controller.if_wins(cell));
  });
};

Game.prototype.restart = function() {
  location.reload();
};

function DataStorage() {
  this.cells = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
}

DataStorage.prototype.getEmptyCells = function() {
  var r = [];
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      if (this.cells[i][j] == null) {
        r.push({
          x: i,
          y: j
        });
      }
    };
  };
  return r;
};

function UI() {}

UI.prototype.updateAll = function(cells, next_turn) {
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
  // console.log(cell);
  if (cell.letter == 'x') {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('empty starter');
    $('#cell-' + cell.x + '-' + cell.y + ' .option-o').hide();
    $('#cell-' + cell.x + '-' + cell.y + ' .option-x').show();
  } else if (cell.letter == 'o') {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('empty starter');
    $('#cell-' + cell.x + '-' + cell.y + ' .option-x').css("color", "#f3f3f3").css("height", "0px").css("font-size", "0px"); // just for a better animation :P
    $('#cell-' + cell.x + '-' + cell.y + ' .option-o').show();
  } else if (cell.letter == null && next_turn == 'x') {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('starter').addClass('empty');
    $('#cell-' + cell.x + '-' + cell.y + ' .option-o').hide();
    $('#cell-' + cell.x + '-' + cell.y + ' .option-x').show();
  } else if (cell.letter == null && next_turn == 'o') {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('starter').addClass('empty');
    $('#cell-' + cell.x + '-' + cell.y + ' .option-x').hide();
    $('#cell-' + cell.x + '-' + cell.y + ' .option-o').show();
  } else if (cell.letter == null && next_turn == null) {
    $('#cell-' + cell.x + '-' + cell.y).removeClass('empty').addClass('starter');
    $('#cell-' + cell.x + '-' + cell.y + ' .option-x').show();
    $('#cell-' + cell.x + '-' + cell.y + ' .option-o').show();
  };
};

UI.prototype.init = function() {
  $('body').removeClass();
  // $('.option-x, .option-o').show();
  $('#header').html('Tic-Tac-Toe');
  $('#header-desc').html('Let\'s start!');
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
    $('#cell-' + empty_cells[i].x + '-' + empty_cells[i].y + ' .option-x').hide();
    $('#cell-' + empty_cells[i].x + '-' + empty_cells[i].y + ' .option-o').hide();
  };
  if (player == 'tie') {
    $('body').removeClass().addClass('tie');
    $('#header').html('It\'s a tie!');
    $('#header-desc').html(restart_btn);
  } else if (player == 'x') {
    $('body').removeClass().addClass('x-wins');
    $('#header-desc').html(restart_btn);
    $('#header-restart-btn').removeClass('btn-default').addClass('btn-primary');
    $('#header').html('X wins!');
    for (var i = 0; i < winning_cells.length; i++) {
      var cell = winning_cells[i];
      $('#cell-' + cell.x + '-' + cell.y).removeClass('empty starter disabled').addClass('x-wins');
    };
  } else if (player == 'o') {
    $('body').removeClass().addClass('o-wins');
    $('#header').html('O wins!');
    $('#header-desc').html(restart_btn);
    $('#header-restart-btn').removeClass('btn-default').addClass('btn-danger');
    for (var i = 0; i < winning_cells.length; i++) {
      var cell = winning_cells[i];
      $('#cell-' + cell.x + '-' + cell.y).removeClass('empty starter disabled').addClass('o-wins');
    };
  };
};

function Controller(ui, data_storage) {
  this.ui = ui;
  this.data_storage = data_storage;
}

Controller.prototype.monitor = function(callback) {
  var ui = this.ui;
  var data_storage = this.data_storage;
  var controller = this;
  $('.option-o, .option-x').click(function() {
    if ($(this).parent().hasClass('starter') || $(this).parent().hasClass('empty')) {
      if ($(this).hasClass('option-x')) {
        var l = 'x';
      } else {
        var l = 'o';
      };
      var new_cell = { // parent id type: cell-x-y
        x: $(this).parent()[0].id.charAt(5),
        y: $(this).parent()[0].id.charAt(7),
        letter: l
      };
      // console.log(new_cell);
      if (typeof callback === "function") {
        callback(new_cell, ui, data_storage, controller);
      }
    };
  });
};

Controller.prototype.if_wins = function(last_cell) {
  var x = last_cell.x;
  var y = last_cell.y;
  var l = last_cell.l;
  var player = this.data_storage.cells[x][y];
  var all = this.data_storage.cells;
  // First, check the diagonal, if the last cell was in it.
  if (x == y || (parseInt(x) + parseInt(y)) == 2) {
    if (player == all[0][0] && all[0][0] == all[1][1] && all[1][1] == all[2][2]) {
      this.ui.end(player, [{
        x: 0,
        y: 0
      }, {
        x: 1,
        y: 1
      }, {
        x: 2,
        y: 2
      }], this.data_storage.getEmptyCells());
      return player;
    } else if (player == all[0][2] && all[0][2] == all[1][1] && all[1][1] == all[2][0]) {
      this.ui.end(player, [{
        x: 0,
        y: 2
      }, {
        x: 1,
        y: 1
      }, {
        x: 2,
        y: 0
      }], this.data_storage.getEmptyCells());
      return player;
    };
  };
  // then check vertical and horizontal directions
  if (player == all[x][0] && all[x][0] == all[x][1] && all[x][1] == all[x][2]) {
    this.ui.end(player, [{
      x: x,
      y: 0
    }, {
      x: x,
      y: 1
    }, {
      x: x,
      y: 2
    }], this.data_storage.getEmptyCells());
    return player;
  } else if (player == all[0][y] && all[0][y] == all[1][y] && all[1][y] == all[2][y]) {
    this.ui.end(player, [{
      x: 0,
      y: y
    }, {
      x: 1,
      y: y
    }, {
      x: 2,
      y: y
    }], this.data_storage.getEmptyCells());
    return player;
  };
  // check if it still has free space, if not then it's a tie
  for (var i = 0; i < all.length; i++) {
    for (var j = 0; j < all.length; j++) {
      if (all[i][j] == null) {
        return "nah";
      }
    };
  };
  // it's a tie!
  this.ui.end("tie", [], []);
  return "tie";
};

