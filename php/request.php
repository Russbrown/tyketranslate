<?php
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "198950707-3RLmEacBJ2WDudXD5lA1cORLEE3TWtPKOAXsxhTE",
    'oauth_access_token_secret' => "hsmLm7tq8N2RGTW4lHMvcO897vS3aL0nYmngyRpPgY",
    'consumer_key' => "9qQO5UsCMlEGF1ZWTNoZnA",
    'consumer_secret' => "RHU4ycCVuKKGdsQlXDbi9bQaNnd1nSdel7Zawt9w6zw"
);


$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?q=hello';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();  





?>