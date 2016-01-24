<?php

session_start();
$_SESSION = array();
session_unset();
session_destroy();

$usersfile = "users.json";
$messagefile = "messages.json";

$f = fopen($usersfile, "w");
fwrite($f, "{}");
fclose($f);

$f1 = fopen($messagefile, "w");
fwrite($f1, "{}");
fclose($f1);

?>