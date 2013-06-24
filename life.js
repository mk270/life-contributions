(function() {
  var life, tick;

  life = function(weeks) {
    var board, cell_live, cells, col_live, colour_of_day, current, directions, neighbours, regenerate, set_tile, style_means_live, tile, v, x, x0, xmax, y, y0, ymax, _results;
    x0 = 0;
    y0 = 0;
    xmax = 54;
    ymax = 6;
    directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    colour_of_day = function(day) {
      var style;
      if (!day) {
        return "eeeeee;";
      } else {
        style = day.getAttribute("style");
        return style.split(" #")[1];
      }
    };
    style_means_live = function(style) {
      return style !== "eeeeee;";
    };
    tile = function(x, y) {
      var _ref;
      return (_ref = weeks[x]) != null ? _ref.childNodes[y] : void 0;
    };
    set_tile = function(x, y, colour) {
      var elt, style;
      style = "fill: #" + colour;
      elt = tile(x, y);
      return elt != null ? elt.setAttribute("style", style) : void 0;
    };
    cell_live = function(x, y) {
      var colour, elt;
      elt = tile(x, y);
      colour = colour_of_day(elt);
      return style_means_live(colour);
    };
    col_live = function(x) {
      var y, _results;
      _results = [];
      for (y = y0; y0 <= ymax ? y <= ymax : y >= ymax; y0 <= ymax ? y++ : y--) {
        _results.push(cell_live(x, y));
      }
      return _results;
    };
    cells = function() {
      var x, _results;
      _results = [];
      for (x = x0; x0 <= xmax ? x <= xmax : x >= xmax; x0 <= xmax ? x++ : x--) {
        _results.push(col_live(x));
      }
      return _results;
    };
    neighbours = function(x, y, board) {
      var dir, dx, dy, tmp;
      tmp = (function() {
        var _i, _len, _ref, _results;
        _results = [];
        for (_i = 0, _len = directions.length; _i < _len; _i++) {
          dir = directions[_i];
          dx = dir[0], dy = dir[1];
          if ((_ref = board[x + dx]) != null ? _ref[y + dy] : void 0) {
            _results.push(1);
          } else {
            _results.push(0);
          }
        }
        return _results;
      })();
      return tmp.reduce(function(x, y) {
        return x + y;
      });
    };
    regenerate = function(x, y, current, board) {
      var n;
      n = neighbours(x, y, board);
      return (current && (2 <= n && n <= 3)) || ((!current) && n === 3);
    };
    board = cells();
    _results = [];
    for (x = x0; x0 <= xmax ? x <= xmax : x >= xmax; x0 <= xmax ? x++ : x--) {
      _results.push((function() {
        var _ref, _results2;
        _results2 = [];
        for (y = y0; y0 <= ymax ? y <= ymax : y >= ymax; y0 <= ymax ? y++ : y--) {
          current = ((_ref = board[x]) != null ? _ref[y] : void 0) || false;
          v = regenerate(x, y, current, board);
          if (v !== current) {
            _results2.push(set_tile(x, y, v ? "d6e685;" : "eeeeee;"));
          } else {
            _results2.push(void 0);
          }
        }
        return _results2;
      })());
    }
    return _results;
  };

  tick = function() {
    var query, selector;
    selector = "div#contributions-calendar div.js-graph svg g g";
    query = document.querySelectorAll(selector);
    if (query) {
      return life(query);
    } else {
      return null;
    }
  };

  window.setInterval(tick, 500);

}).call(this);
