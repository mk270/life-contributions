
console.log("life begins at onLoad()");

var tick = function() {
  console.log("tick");

  var query = document.querySelector("div#contributions-calendar div.js-graph svg");
  if (!query) {
	return;
  }

  var query = document.querySelector("svg g g");

  // 
  
};

window.setInterval(tick, 1000);
