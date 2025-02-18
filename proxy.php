<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$server_ip = "185.228.82.235";
$server_port = "30120";

$data = file_get_contents("http://$server_ip:$server_port/players.json");
echo $data;
?>
