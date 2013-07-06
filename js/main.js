$(document).ready(function() {
	
	$input = $("#input");
	$translate = $("#translate");
	$output = $("#translated");

	arrays = {};
	result = {};
	var app = {
		init: function() {
			this.bindEvents();
			this.loadDatabase();
		},
		bindEvents: function() {
			$translate.bind("click", this.breakdown)
		},
		breakdown: function() {

			var text = $input.val();
			var words = text.split(" ");
			app.translate(words);
			
		},
		translate: function(words) {
			if (typeof arrays.english != 'undefined') {
				console.log("jdsjf");
				for (var i = 0; i < words.length; i++) {
				    var item = words[i];
				    if ($.inArray(item, arrays.english) > -1){
				    	var key = $.inArray(item, arrays.english);
				    	words[i] = arrays.yorkshire[key];
				    } 
				}
			}
			$output.val(words.join(" "));
		},
		loadDatabase: function() {
			
			$.getJSON('data/words.json', function(data) {
			  arrays.english = [];
			  arrays.yorkshire = [];

			  $.each(data, function(key, val) {

			  	arrays.english.push(val.English);
			  	arrays.yorkshire.push(val.Yorkshire);
			  });
			 
			  
			});
		}
	}


	app.init();
});