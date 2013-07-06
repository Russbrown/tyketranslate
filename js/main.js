$(document).ready(function() {
	
	$input = $("#input");
	$translate = $("#translate");
	$output = $("#output");

	arrays = {};
	result = {};

	function capitaliseFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}
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
			var newtext = text;

			var temp = text.split(/[\s.:]+/);
			for (var i = 0; i < temp.length; i++) {
				var capital = capitaliseFirstLetter(temp[i]);
				newtext.replace(temp[i], capital);
			}



			var words = newtext.split(/[ ]+/);;
			result.string = newtext;
			app.translate(words);
			
		},
		translate: function(words) {
			console.log(words);
			if (typeof arrays.english != 'undefined') {
				for (var i = 0; i < words.length; i++) {
				    var item = words[i].replace(/[^\w\s]/gi, '');
				    if ($.inArray(item.toLowerCase(), arrays.english) > -1){




				    	var key = $.inArray(item.toLowerCase(), arrays.english);
				    	console.log((result.string).replace(" " + words[i], " " + arrays.yorkshire[key]));
				    	if (item[0].toUpperCase() == item[0]) {
				    		console.log(item);
				    		result.string = (result.string).replace(item, capitaliseFirstLetter(arrays.yorkshire[key]));
				    	} 
				    	else {
				    		result.string = (result.string).replace(" " + item, " " + arrays.yorkshire[key]);
				    	}

				    } 
				}
			}
			$output.val(result.string);
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