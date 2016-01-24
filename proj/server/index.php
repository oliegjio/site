<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="main.css">
    <!--<link rel="shortcut icon" type="image/png" href="images/favicon.png">-->
    <title></title>
  </head>
<body>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="main.js"></script>
<textarea id="textarea" rows="15" readonly="readonly"></textarea>
<input type="textarea" id="input">
<input type="button" id="button" value="BUTTON">
<a href="../../index.php" style="position: fixed; right: 0px; background: orange; font-size: 30px; font-family: georgia; text-align: center; width: 42px; height: 42px; display: block; top: 0px">H</a>
<?php

session_start();

if(isset($_SESSION["id"]))
{

}
else
{
	$_SESSION["id"] = (string) rand(10000, 99999);

	$file = "users.json";

	$modf = json_decode(file_get_contents($file), true);
	$modf[$_SESSION["id"]] = (string) time();

	$f = fopen($file, "w");
	fwrite($f, json_encode($modf));
	fclose($f);
}

?>
</body>
</html>