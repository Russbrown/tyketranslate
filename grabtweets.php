
	<?php
		ini_set('display_errors', 1);
		require_once('TwitterAPIExchange.php');

		/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
		$settings = array(
		    'oauth_access_token' => "108106603-GJq9Tk2MQl8uPjxdhdHbi78d8bmP9Wc9QeBTvWaI",
		    'oauth_access_token_secret' => "ltpg7gIJQAsVroptTXVwHiRI1raCBCLfsP1coIPkDo",
		    'consumer_key' => "29f9G08feyLt3ugEpwZeA",
		    'consumer_secret' => "2IRT8EC4zrYhmXMgeDXvWcAK9aTra7hrwlhMtNKMc"
		);

		/** Perform a GET request and echo the response **/
		/** Note: Set the GET field BEFORE calling buildOauth(); **/
		$url = 'https://api.twitter.com/1.1/search/tweets.json';
		$getfield = '?geocode=53.932898,-1.082153,1mi';
		$requestMethod = 'GET';
		$twitter = new TwitterAPIExchange($settings);
		echo $twitter->setGetfield($getfield)
		             ->buildOauth($url, $requestMethod)
		             ->performRequest();
    ?>