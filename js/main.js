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
			this.loadTwitter();
			// this.playMusic();
			 $('textarea').autosize();   
		},
		bindEvents: function() {
			$translate.bind("click", this.convert)
		},
		convert: function() {
			var words = app.breakdown();
			var string = app.translate(words);
			$output.val(string).trigger('autosize.resize');
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
			return words;
		},
		translate: function(words) {

			if (typeof arrays.englishPhrases != 'undefined') {
				for (var i = 0; i < (arrays.englishPhrases).length; i++) {
					var item = arrays.englishPhrases[i];
					result.string = (result.string).replace(item, arrays.yorkshirePhrases[i]);
				}
			}

			if (typeof arrays.englishWords != 'undefined') {
				for (var i = 0; i < words.length; i++) {
				    var item = words[i].replace(/[^\w\s]/gi, '');
				    if ($.inArray(item.toLowerCase(), arrays.englishWords) > -1){




				    	var key = $.inArray(item.toLowerCase(), arrays.englishWords);
				    	if (item[0].toUpperCase() == item[0]) {
				    		console.log(item);
				    		result.string = (result.string).replace(item, capitaliseFirstLetter(arrays.yorkshireWords[key]));
				    	} 
				    	else {
				    		result.string = (result.string).replace(" " + item, " " + arrays.yorkshireWords[key]);
				    	}

				    } 
				}
			}
			return(result.string);
		},
		loadTwitter: function() {
			$.getJSON('php/request.php', function(data) {
				var tweets = [];
			  	$.each(data.statuses, function(key, val) {
			  		var user = val.user.screen_name;
			  		var tweet = val.text;
			  		var profile_pic = val.user.profile_image_url;
			  		tweets.push(val.text);
			  	});
			 
			  
			});
		},
		loadDatabase: function() {
			
			$.getJSON('data/words.json', function(data) {
			  arrays.englishWords = [];
			  arrays.yorkshireWords = [];

			  $.each(data, function(key, val) {

			  	arrays.englishWords.push(val.English);
			  	arrays.yorkshireWords.push(val.Yorkshire);
			  });
			 
			  
			});
			$.getJSON('data/phrases.json', function(data) {
			  arrays.englishPhrases = [];
			  arrays.yorkshirePhrases = [];

			  $.each(data, function(key, val) {

			  	arrays.englishPhrases.push(val.English);
			  	arrays.yorkshirePhrases.push(val.Yorkshire);
			  });
			 
			  
			});
		},
		playMusic: function() {
			var audio = new Audio('sounds/anthem.mp3');
			audio.play();
		}
	}

	app.init();
});