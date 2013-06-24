(function() {
  var life, tick;

  console.log("life begins at onLoad()");

  life = function(query) {
    console.log("life()");
    return null;
  };

  tick = function() {
    var query, selector;
    console.log("tick");
    selector = "div#contributions-calendar div.js-graph svg";
    query = document.querySelector(selector);
    if (query) {
      return life(query);
    } else {
      return null;
    }
  };

  window.setInterval(tick, 1000);

}).call(this);
