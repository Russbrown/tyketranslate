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
			this.playMusic();
			$('textarea').autosize();   
		},
		bindEvents: function() {
			$translate.bind("click", this.buttonClick)
		},
		convert: function(string) {
			var words = app.breakdown(string);
			var string = app.translate(words);
			// $output.val(string).trigger('autosize.resize');
			return string
		},
		buttonClick: function() {
			var text = $input.val();
			var words = app.breakdown(text);
			var translated = app.translate(words);
			var special = app.special(translated);
			$output.val(special).trigger('autosize.resize');
		},
		breakdown: function(input) {

			var text = input;
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

					result.string = (result.string.toLowerCase()).replace(item.toLowerCase(), arrays.yorkshirePhrases[i]);
				}
			}

			if (typeof arrays.englishWords != 'undefined') {
				for (var i = 0; i < words.length; i++) {
				    var item = words[i].replace(/[^\w\s]/gi, '');
				    if ($.inArray(item.toLowerCase(), arrays.englishWords) > -1){




				    	var key = $.inArray(item.toLowerCase(), arrays.englishWords);
				    	if (item[0].toUpperCase() == item[0]) {
				    		result.string = (result.string.toLowerCase()).replace(item.toLowerCase(), capitaliseFirstLetter(arrays.yorkshireWords[key]));
				    	} 
				    	else {
				    		result.string = (result.string).replace(" " + item, " " + arrays.yorkshireWords[key]);
				    	}

				    } 
				}
			}

			var temp = result.string.split(/[\s.:]+/);
			for (var i = 0; i < temp.length; i++) {
				var capital = capitaliseFirstLetter(temp[i]);
				result.string.replace(temp[i], capital);
			}
			return(capitaliseFirstLetter(result.string));
		},
		special: function(text) {
			var text = text.replace("t' ", "t'");
			var text = text.replace("t't' ", "t'");
			console.log(text);
			return text;
		},
		loadTwitter: function() {
			$.getJSON('php/request.php', function(data) {
				var tweets = [];
			  	$.each(data.statuses, function(key, val) {
			  		var item = new Object();
			  		item.user = val.user.screen_name;
			  		item.tweet = val.text;
			  		item.profile_pic = val.user.profile_image_url;
			  		tweets.push(item);
			  	});

			  	var build = "";
			  	for (var i = 0; i < tweets.length; i++) {
			  		// console.log(tweets[i]);
					var user = tweets[i].user;
			  		var tweet = tweets[i].tweet;
					var translated = app.convert(tweet);
			  		var profile_pic = tweets[i].profile_pic;
			  		
			  		build += " \
			  		<div id='tyke-container'> \
						<div class='profile'> \
							<img src='" + profile_pic + "' alt='profile pic' /> \
						</div> \
						<div id='tyke-card' class='tyketweet'> \
							<div class='front face tyked'> \
								<h3>" + translated + "</h3> \
							</div> \
							<div class='back face center original'> \
								<h3>" + tweet + "</h3> \
							</div> \
						</div> \
					</div>";
			  	}
			  	$(".stream-wrapper").html(build);
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
	//console.log("hello i")
	app.init();
});