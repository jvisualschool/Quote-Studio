<?php
$text = "Challenge yourself to find the good and beautiful thing inside of everyone.";
$api_key = 'AIzaSyBHLhJzAx8sYOkZqwe8GR6U1SNkLWL4FAs';
$url = "https://generativelanguage.googleapis.com/v1beta/models?key=" . $api_key;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

echo "RESPONSE: " . $response . "\n";
echo "ERROR: " . $error . "\n";
?>
