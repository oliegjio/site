<?php

//header('Access-Control-Allow-Origin: *');

/*$this->getResponse()->setHeader("Access-Control-Allow-Origin", "*");
$this->getResponse()->setHeader("Access-Control-Allow-Headers", "x-requested-with");
$this->getResponse()->setHeader("Access-Control-Request-Method", "GET,POST");
$this->getResponse()->setHeader("Access-Control-Allow-Credentials", "true");*/

/*$message = $_GET["q"];
echo $message;*/

/*$message = json_decode($_GET["message"]);
echo $message->text1;*/


//------------------------------------------------------------


/*$message = json_decode($_POST["message"]);
$message->{"text2"} = "YAY!";
echo json_encode($message);*/

/*$json = '{"test1":"OKAY"}';

$file = "json.json";
$fo = fopen($file, "w");
fwrite($fo, $json);
fclose($fo);

$modf = json_decode(file_get_contents($file));
$modf->{"megatest"} = "OOOOOO";

$fo = fopen($file, "w");
fwrite($fo, json_encode($modf));
fclose($fo);

if($_POST["message"] == "give")
{
	echo file_get_contents($file);
}*/

session_start();

if(isset($_POST["message"])) $message = $_POST["message"];
if(isset($_POST["request"])) $request = $_POST["request"];

if(isset($message))
{
	$decmessage = json_decode($message, true);
	$file = "messages.json";

	$modf = json_decode(file_get_contents($file), true);
	$messageid = (string) rand(10000, 99999);
	$modf[$messageid]["message"] = $decmessage;
	$modf[$messageid]["time"] = (string) time();

	$f = fopen($file, "w");
	fwrite($f, json_encode($modf));
	fclose($f);

	exit;
}

if(isset($request))
{

	$messagesfile = "messages.json";
	$modmessagesfile = json_decode(file_get_contents($messagesfile), true);

	$usersfile = "users.json";
	$moduserfile = json_decode(file_get_contents($usersfile), true);

	if(isset($modmessagesfile))
	{
		foreach($modmessagesfile as $key => $value)
		{
			if((int) $modmessagesfile[$key]["time"] > (int) $moduserfile[$_SESSION["id"]])
			{
				echo $modmessagesfile[$key]["message"];
				$moduserfile[$_SESSION["id"]] = (string) time();
			}
		}
	}

	$oldestuserid = "1000000000000";
	$previoususer = "1000000000000";
	foreach($moduserfile as $key => $value)
	{
		if((int) $value < (int) $previoususer)
		{
			$previoususer = $value;
			$oldestuserid = $key;
		}
	}

	if(isset($modmessagesfile))
	{
		foreach($modmessagesfile as $key => $value)
		{
			if(isset($modmessagesfile[$key]["time"]) && isset($moduserfile[$oldestuserid]))
			{
				if((int) $modmessagesfile[$key]["time"] + 10 < (int) $moduserfile[$oldestuserid])
				{
					unset($modmessagesfile[$key]);
				}
			}
		}
	}
	
	$f1 = fopen($messagesfile, "w");
	fwrite($f1, json_encode($modmessagesfile));
	fclose($f1);

	$f = fopen($usersfile, "w");
	fwrite($f, json_encode($moduserfile));
	fclose($f);

	exit;
}

?>